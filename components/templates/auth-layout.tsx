import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

/**
 * 인증 레이아웃 (Template)
 *
 * 중앙 정렬 Card 레이아웃
 * 로그인, 회원가입 페이지용
 */
export function AuthLayout({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-md">
        <Card className="p-8">
          {title && (
            <div className="space-y-2 mb-6">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {children}
        </Card>
      </div>
    </div>
  );
}
