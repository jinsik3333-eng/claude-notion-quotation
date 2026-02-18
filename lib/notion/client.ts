import { Client, isFullPage, APIResponseError, APIErrorCode } from "@notionhq/client";
import type {
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Quote, QuoteItem } from "@/types/quote";
import { mapPageToQuote } from "@/lib/notion/quote-mapper";
import { quoteSchema, quoteItemSchema } from "@/lib/validations/quote";

/**
 * Notion API 클라이언트 싱글톤
 * NOTION_API_KEY 환경변수 필수
 * 서버 사이드에서만 사용 (API 키 클라이언트 노출 방지)
 */

if (!process.env.NOTION_API_KEY) {
  throw new Error("환경변수 NOTION_API_KEY가 설정되지 않았습니다.");
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/**
 * Quote 페이지의 Items_DB relation에서 항목들을 조회
 * 양방향 관계성을 통해 연결된 Items를 직접 가져오기
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getQuoteItems(quotePage: any): Promise<QuoteItem[]> {
  try {
    const props = quotePage.properties;

    // Items_DB relation 필드 확인
    const itemsRelation = props["Items_DB"] || props.items_db;
    if (!itemsRelation || itemsRelation.type !== "relation") {
      console.warn("[Notion] Items_DB relation 필드를 찾을 수 없습니다");
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemIds = itemsRelation.relation.map((rel: any) => rel.id);
    if (itemIds.length === 0) {
      return [];
    }

    const items: QuoteItem[] = [];

    // 각 항목 ID로 페이지 조회
    for (const itemId of itemIds) {
      try {
        const itemPage = await notion.pages.retrieve({ page_id: itemId });

        if (!isFullPage(itemPage)) {
          continue;
        }

        const itemProps = itemPage.properties;

        // amount 계산: unitPrice * quantity
        const unitPrice =
          itemProps.unitPrice?.type === "number" ? itemProps.unitPrice.number ?? 0 : 0;
        const quantity =
          itemProps.quantity?.type === "number" ? itemProps.quantity.number ?? 0 : 0;
        const amount = unitPrice * quantity;

        const item = {
          id: itemPage.id,
          name:
            itemProps["이름"]?.type === "title"
              ? itemProps["이름"].title.map((t: RichTextItemResponse) => t.plain_text).join("")
              : "",
          unitPrice,
          quantity,
          amount,
          order: itemProps.order?.type === "number" ? itemProps.order.number ?? 0 : 0,
        };

        // Zod 검증
        const validation = quoteItemSchema.safeParse(item);
        if (!validation.success) {
          console.warn(`[Notion] 항목 검증 실패 (ID: ${itemPage.id}):`, validation.error.message);
          continue;
        }

        items.push(validation.data);
      } catch (error) {
        console.warn(`[Notion] 항목 ${itemId} 조회 실패:`, error instanceof Error ? error.message : String(error));
        continue;
      }
    }

    // order 필드로 정렬
    items.sort((a, b) => a.order - b.order);

    return items;
  } catch (error) {
    console.error(`견적 항목 조회 중 오류:`, error instanceof Error ? error.message : String(error));
    return [];
  }
}

/**
 * Notion 데이터베이스에서 특정 견적서를 조회
 *
 * @param id - Notion 페이지 ID (32자 또는 UUID 형식)
 * @returns 검증된 Quote 객체, 페이지를 찾을 수 없거나 공개 불가 상태면 null
 * @throws Notion API 오류 또는 검증 실패 시 오류 발생
 */
export async function getQuote(id: string): Promise<Quote | null> {
  try {
    // 1. Notion 페이지 조회
    const page = await notion.pages.retrieve({ page_id: id });

    // 2. PartialPageObjectResponse 필터링
    if (!isFullPage(page)) {
      return null;
    }

    // 3. status가 draft인 경우 공개 접근 차단
    const props = page.properties;
    const status =
      props.status?.type === "select"
        ? ((props.status.select?.name as Quote["status"]) ?? "draft")
        : "draft";

    if (status === "draft") {
      return null;
    }

    // 4. Quote 페이지의 Items_DB relation에서 항목 조회
    const items = await getQuoteItems(page);

    // 5. 견적서 객체 생성
    const quote = mapPageToQuote(page, items);

    // 6. Zod 검증
    const validation = quoteSchema.safeParse(quote);
    if (!validation.success) {
      throw new Error(`견적서 검증 실패: ${validation.error.message}`);
    }

    return validation.data;
  } catch (error) {
    // Notion API에서 페이지를 찾을 수 없는 경우
    if (
      error instanceof APIResponseError &&
      error.code === APIErrorCode.ObjectNotFound
    ) {
      return null;
    }

    // 그 외 오류는 전파
    throw error;
  }
}
