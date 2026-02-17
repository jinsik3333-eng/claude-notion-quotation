import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * 페이지 래퍼 (Template)
 *
 * - 최대 너비, 패딩 일관성 유지
 */
export function PageWrapper({
  children,
  className = "",
}: PageWrapperProps) {
  return (
    <div
      className={cn(
        "container mx-auto max-w-7xl px-4 py-8 md:py-12",
        className
      )}
    >
      {children}
    </div>
  );
}
