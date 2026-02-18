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
 * Notion Items_DB에서 특정 견적서에 해당하는 항목들을 조회
 * quoteId relation 필터로 항목 검색
 */
async function getQuoteItems(quotePageId: string): Promise<QuoteItem[]> {
  const itemsDatabaseId = process.env.NOTION_ITEMS_DATABASE_ID;

  if (!itemsDatabaseId) {
    throw new Error("환경변수 NOTION_ITEMS_DATABASE_ID가 설정되지 않았습니다.");
  }

  try {
    const response = await (notion as any).dataSources.query({
      data_source_id: itemsDatabaseId,
      filter: {
        property: "quoteId",
        relation: {
          contains: quotePageId,
        },
      },
      sorts: [
        {
          property: "order",
          direction: "ascending",
        },
      ],
    });

    const items: QuoteItem[] = [];

    for (const result of response.results) {
      // PartialPageObjectResponse 제외 - properties 접근 불가
      if (!isFullPage(result)) {
        continue;
      }

      const props = result.properties;

      // amount는 number 타입 또는 formula 타입일 수 있음
      let amount = 0;
      if (props.amount?.type === "number" && props.amount.number !== null) {
        amount = props.amount.number;
      } else if (
        props.amount?.type === "formula" &&
        props.amount.formula?.type === "number" &&
        props.amount.formula.number !== null
      ) {
        amount = props.amount.formula.number;
      }

      const item = {
        id: result.id,
        name:
          props["이름"]?.type === "title"
            ? props["이름"].title.map((t: RichTextItemResponse) => t.plain_text).join("")
            : "",
        unitPrice:
          props.unitPrice?.type === "number" ? props.unitPrice.number ?? 0 : 0,
        quantity: props.quantity?.type === "number" ? props.quantity.number ?? 0 : 0,
        amount,
        order: props.order?.type === "number" ? props.order.number ?? 0 : 0,
      };

      // 각 항목별 Zod 검증 - 실패 시 경고하고 건너뛰기
      const validation = quoteItemSchema.safeParse(item);
      if (!validation.success) {
        console.warn(`[Notion] 항목 검증 실패 (ID: ${result.id}):`, validation.error.message);
        continue;
      }

      items.push(validation.data);
    }

    return items;
  } catch (error) {
    throw new Error(`Items_DB 조회 중 오류 발생: ${error instanceof Error ? error.message : String(error)}`);
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

    // 4. 항목(Items) 조회
    const items = await getQuoteItems(id);

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
