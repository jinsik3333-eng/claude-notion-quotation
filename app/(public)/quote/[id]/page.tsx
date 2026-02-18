import { notFound } from "next/navigation";
import type { Metadata } from "next";

/**
 * 견적서 공개 뷰 페이지
 * - 인증 없이 고유 ID로 Notion 견적서 조회 및 렌더링
 * - 서버 컴포넌트: Notion API는 서버에서만 호출
 */

// Notion API 응답을 60초간 캐싱
export const revalidate = 60;

// 검색 엔진 색인 차단
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;

  // TODO: Notion API 클라이언트 구현 후 실제 데이터 조회로 교체
  // const quote = await getQuote(id);
  // if (!quote) notFound();

  // 임시 플레이스홀더 (Phase 1 완료 후 제거)
  if (!id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <p className="text-muted-foreground text-center">
          견적서 뷰 구현 예정 (ID: {id})
        </p>
      </div>
    </div>
  );
}
