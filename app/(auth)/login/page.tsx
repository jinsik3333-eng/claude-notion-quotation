import Link from "next/link";
import { AuthLayout } from "@/components/templates/auth-layout";
import { LoginForm } from "@/components/organisms/login-form";
import { Button } from "@/components/ui/button";

/**
 * 로그인 페이지
 */
export const metadata = {
  title: "로그인 | Claude Next.js Starters",
  description: "계정에 로그인하세요",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="로그인"
      description="계정에 로그인하여 시작하세요"
    >
      <LoginForm />

      <div className="mt-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-950 px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>

        <div className="text-sm text-center">
          <span className="text-muted-foreground">계정이 없으신가요? </span>
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            회원가입
          </Link>
        </div>

        <div className="text-sm text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
