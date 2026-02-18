import type { Quote } from "@/types/quote";

interface QuoteHeaderProps {
  quote: Quote;
}

/**
 * 견적서 헤더 컴포넌트
 * - 견적번호, 발행일, 유효기간, 고객 정보 표시
 */
export function QuoteHeader({ quote }: QuoteHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold tracking-tight">견 적 서</h1>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">견적번호</p>
          <p className="font-semibold">{quote.quoteNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">수신</p>
          <p className="font-semibold">{quote.clientName}</p>
          {quote.clientCompany && (
            <p className="text-sm text-muted-foreground">{quote.clientCompany}</p>
          )}
        </div>
        <div className="space-y-1 text-right">
          <div>
            <p className="text-sm text-muted-foreground">발행일</p>
            <p className="text-sm">{quote.issueDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">유효기간</p>
            <p className="text-sm">{quote.validUntil}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
