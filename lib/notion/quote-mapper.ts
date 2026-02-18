import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Quote, QuoteItem } from "@/types/quote";
import { DEFAULT_TAX_RATE } from "@/lib/constants/quote";

/**
 * Notion Rich Text 배열에서 plain_text 추출
 */
function extractRichText(richTextItems: RichTextItemResponse[]): string {
  return richTextItems.map((t) => t.plain_text).join("");
}

/**
 * Notion 페이지 응답 → Quote 타입 변환
 * 견적 항목(items)은 별도 API 호출로 전달받음
 */
export function mapPageToQuote(
  page: PageObjectResponse,
  items: QuoteItem[] = []
): Quote {
  const props = page.properties;

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  // Notion에서 percentage 포맷의 taxRate는 정수로 반환됨 (예: 10 = 10%)
  // 소수 단위로 변환 필요 (10 / 100 = 0.1)
  const rawTaxRate =
    props.taxRate?.type === "number" && props.taxRate.number !== null
      ? props.taxRate.number
      : DEFAULT_TAX_RATE * 100;
  const taxRate = rawTaxRate / 100;
  const taxAmount = Math.round(subtotal * taxRate);
  const totalAmount = subtotal + taxAmount;

  return {
    id: page.id,
    quoteNumber:
      props.quoteNumber?.type === "rich_text"
        ? extractRichText(props.quoteNumber.rich_text)
        : "",
    title:
      props["이름"]?.type === "title"
        ? props["이름"].title.map((t: RichTextItemResponse) => t.plain_text).join("")
        : "견적서",
    clientName:
      props.clientName?.type === "rich_text"
        ? extractRichText(props.clientName.rich_text)
        : "",
    clientCompany:
      props.clientCompany?.type === "rich_text"
        ? extractRichText(props.clientCompany.rich_text) || undefined
        : undefined,
    issueDate:
      props.issueDate?.type === "date" ? (props.issueDate.date?.start ?? "") : "",
    validUntil:
      props.validUntil?.type === "date" ? (props.validUntil.date?.start ?? "") : "",
    status:
      props.status?.type === "select"
        ? ((props.status.select?.name as Quote["status"]) ?? "draft")
        : "draft",
    items,
    subtotal,
    taxRate,
    taxAmount,
    totalAmount,
    notes:
      props.notes?.type === "rich_text"
        ? extractRichText(props.notes.rich_text) || undefined
        : undefined,
    issuerName:
      props.issuerName?.type === "rich_text"
        ? extractRichText(props.issuerName.rich_text)
        : "",
    issuerContact:
      props.issuerContact?.type === "rich_text"
        ? extractRichText(props.issuerContact.rich_text) || undefined
        : undefined,
  };
}
