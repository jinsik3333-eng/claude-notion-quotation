import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getQuote } from "@/lib/notion/client";
import { QuoteView } from "@/components/organisms/quote-view";

/**
 * 견적서 공개 뷰 페이지
 * - 인증 없이 고유 ID로 Notion 견적서 조회 및 렌더링
 * - 서버 컴포넌트: Notion API는 서버에서만 호출
 */

// Notion API 응답을 60초간 캐싱
export const revalidate = 60;

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

/**
 * 동적 메타데이터 생성
 * - 견적서 제목과 번호를 기반으로 메타데이터 생성
 * - 검색 엔진 색인 차단 유지
 */
export async function generateMetadata({
  params,
}: QuotePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const quote = await getQuote(id);

    if (!quote) {
      return {
        title: "견적서를 찾을 수 없습니다",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return {
      title: `${quote.quoteNumber} - ${quote.clientName} 견적서`,
      description: `${quote.issuerName}에서 발행한 ${quote.clientName} 고객 견적서입니다.`,
      robots: {
        index: false,
        follow: false,
      },
    };
  } catch {
    return {
      title: "견적서 조회 중 오류가 발생했습니다",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;

  // Notion API에서 견적서 조회
  const quote = await getQuote(id);

  // 견적서를 찾을 수 없거나 draft 상태면 404 반환
  if (!quote) {
    notFound();
  }

  return <QuoteView quote={quote} />;
}
