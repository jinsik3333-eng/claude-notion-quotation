import { Separator } from "@/components/ui/separator";
import type { Quote } from "@/types/quote";

interface QuoteSummaryProps {
  quote: Pick<Quote, "subtotal" | "taxRate" | "taxAmount" | "totalAmount">;
}

/**
 * 견적서 금액 요약 컴포넌트
 * - 소계, 부가세, 총액 표시
 * - 금액은 천단위 콤마 포맷 + 원화 표기
 */
export function QuoteSummary({ quote }: QuoteSummaryProps) {
  const formatKRW = (amount: number) =>
    `${amount.toLocaleString("ko-KR")} 원`;

  return (
    <div className="flex justify-end">
      <div className="w-64 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">소계 (VAT 별도)</span>
          <span>{formatKRW(quote.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            부가세 ({Math.round(quote.taxRate * 100)}%)
          </span>
          <span>{formatKRW(quote.taxAmount)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-base">
          <span>합계</span>
          <span>{formatKRW(quote.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}
