"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Quote } from "@/types/quote";

interface PDFDownloadButtonProps {
  quote: Quote;
}

/**
 * PDF 다운로드 버튼 (클라이언트 컴포넌트)
 * - window.print()를 사용하여 브라우저 프린트 다이얼로그 호출
 * - document.title을 임시 변경하여 PDF 파일명 자동화
 * - 인쇄 시 버튼은 숨김 처리 (print:hidden)
 */
export function PDFDownloadButton({ quote }: PDFDownloadButtonProps) {
  const handlePrint = () => {
    const originalTitle = document.title;

    // Chrome/Edge에서 document.title이 PDF 기본 파일명으로 사용됨
    document.title = `견적서_${quote.quoteNumber}_${quote.clientName}`;

    window.print();

    // 프린트 다이얼로그 닫힌 후 원본 제목 복원
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  return (
    <Button onClick={handlePrint} className="w-full gap-2" variant="default">
      <Download className="h-4 w-4" />
      PDF 다운로드
    </Button>
  );
}
