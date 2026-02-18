import type { ReactNode } from "react";

/**
 * 공개 페이지 레이아웃
 * 헤더/푸터 없음, 라이트 모드 강제 고정 (인쇄/PDF 일관성 보장)
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
