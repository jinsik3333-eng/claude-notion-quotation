import { FileX } from "lucide-react";

/**
 * 견적서 오류 컴포넌트
 * - 존재하지 않거나 접근 불가한 견적서 ID 접근 시 표시
 * - 공개 페이지이므로 홈 이동 버튼 없음
 */
export function QuoteError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-4 max-w-sm">
        <FileX className="w-12 h-12 mx-auto text-muted-foreground" />
        <h1 className="text-xl font-bold">견적서를 찾을 수 없습니다</h1>
        <p className="text-sm text-muted-foreground">
          링크가 만료되었거나 올바르지 않은 견적서 주소입니다.
          담당자에게 문의해 주세요.
        </p>
      </div>
    </div>
  );
}
