import { PageHeader } from "@/components/molecules/page-header";
import { PageWrapper } from "@/components/templates/page-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 정보 페이지
 */
export const metadata = {
  title: "정보 | Claude Next.js Starters",
  description: "스타터킷에 대한 정보와 기술 스택",
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="프로젝트 정보"
        description="Claude Next.js Starters에 대해 알아보세요"
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "정보" },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* 프로젝트 소개 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">프로젝트 소개</h2>
          <p className="text-muted-foreground">
            Claude Next.js Starters는 모던 웹 개발을 위한 완벽한 기초를 제공합니다.
            Atomic Design 패턴과 최신 기술 스택을 결합하여 개발자가 비즈니스 로직에
            집중할 수 있도록 합니다.
          </p>
          <p className="text-muted-foreground">
            이 프로젝트는 다음과 같은 목표로 만들어졌습니다:
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>빠른 프로젝트 시작</li>
            <li>일관된 코드 구조</li>
            <li>재사용 가능한 컴포넌트</li>
            <li>Type 안전성</li>
            <li>모던 개발 경험</li>
          </ul>
        </div>

        {/* 기술 스택 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">기술 스택</h2>
          <div className="grid gap-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">프레임워크</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Next.js 16.1.6, React 19.2.3
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">스타일링</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Tailwind CSS 4, shadcn/ui
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">폼 & 검증</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                React Hook Form, Zod
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">상태 관리</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Zustand
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">테마</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                next-themes
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">알림</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Sonner
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Atomic Design */}
      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold">Atomic Design 구조</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Atoms</CardTitle>
              <CardDescription className="text-xs">최소 단위</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Button, Input, Badge, Avatar, Logo, Theme Toggle
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Molecules</CardTitle>
              <CardDescription className="text-xs">Atoms 조합</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              FormField, NavItem, UserMenu, PageHeader
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Organisms</CardTitle>
              <CardDescription className="text-xs">독립 기능</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Header, Footer, Sidebar, LoginForm
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Templates</CardTitle>
              <CardDescription className="text-xs">레이아웃</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              DefaultLayout, DashboardLayout, AuthLayout
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Pages</CardTitle>
              <CardDescription className="text-xs">라우트</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              /, /dashboard, /login, /about
            </CardContent>
          </Card>
        </div>
      </section>
    </PageWrapper>
  );
}
