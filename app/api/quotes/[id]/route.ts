import { NextResponse } from "next/server";
import { getQuote } from "@/lib/notion/client";

/**
 * GET /api/quotes/[id]
 * Notion 데이터베이스에서 특정 견적서를 조회하여 반환
 *
 * 참고: 공개 뷰 페이지(/quote/[id])는 서버 컴포넌트에서 Notion API를 직접 호출하므로
 * 이 API 라우트는 선택적으로 활용 (클라이언트 사이드 PDF 라이브러리 등)
 */

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    const quote = await getQuote(id);

    // 페이지를 찾을 수 없거나 draft 상태
    if (!quote) {
      return NextResponse.json(
        {
          error: "NOT_FOUND",
          message: "견적서를 찾을 수 없습니다.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    console.error("[API] /api/quotes/[id] 조회 오류:", error);

    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: "데이터 조회 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
