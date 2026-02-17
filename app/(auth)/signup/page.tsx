import Link from "next/link";
import { AuthLayout } from "@/components/templates/auth-layout";
import { SignupForm } from "@/components/organisms/signup-form";

/**
 * 회원가입 페이지
 */
export const metadata = {
  title: "회원가입 | Claude Next.js Starters",
  description: "새 계정을 생성하세요",
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="회원가입"
      description="새 계정을 생성하여 시작하세요"
    >
      <SignupForm />

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
          <span className="text-muted-foreground">이미 계정이 있으신가요? </span>
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            로그인
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
