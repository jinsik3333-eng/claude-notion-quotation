import { QuoteHeader } from "@/components/organisms/quote-header";
import { QuoteItemsTable } from "@/components/organisms/quote-items-table";
import { QuoteSummary } from "@/components/organisms/quote-summary";
import { PDFDownloadButton } from "@/components/molecules/pdf-download-button";
import type { Quote } from "@/types/quote";

interface QuoteViewProps {
  quote: Quote;
}

/**
 * 견적서 전체 뷰 컴포넌트
 * - 헤더, 항목 테이블, 금액 요약, PDF 다운로드 버튼 통합
 * - 서버 렌더링 (PDFDownloadButton만 클라이언트)
 */
export function QuoteView({ quote }: QuoteViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 print:py-0 print:bg-white">
      <div className="quote-container max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8 space-y-8 print:shadow-none print:rounded-none">
        {/* 견적서 헤더 */}
        <QuoteHeader quote={quote} />

        {/* 견적 항목 테이블 */}
        <QuoteItemsTable items={quote.items} />

        {/* 금액 요약 */}
        <QuoteSummary quote={quote} />

        {/* PDF 다운로드 버튼 */}
        <div className="pdf-download-button print:hidden">
          <PDFDownloadButton quote={quote} />
        </div>

        {/* 발행자 정보 및 비고 */}
        <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            발행자: {quote.issuerName}
            {quote.issuerContact && ` | 연락처: ${quote.issuerContact}`}
          </p>
          {quote.notes && <p>{quote.notes}</p>}
          <p className="text-xs">
            * 본 견적서의 유효기간은 {quote.validUntil}까지입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
