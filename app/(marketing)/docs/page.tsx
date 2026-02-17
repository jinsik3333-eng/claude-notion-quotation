import { PageHeader } from "@/components/molecules/page-header";
import { PageWrapper } from "@/components/templates/page-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code2, Zap, Layers } from "lucide-react";

/**
 * 문서 페이지
 */
export const metadata = {
  title: "문서 | Claude Next.js Starters",
  description: "스타터킷 사용 가이드 및 문서",
};

export default function DocsPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="문서"
        description="스타터킷 사용 방법 및 가이드"
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "문서" },
        ]}
      />

      <div className="mt-12 space-y-12">
        {/* 시작하기 */}
        <section className="space-y-6">
          <div className="flex gap-3 items-start">
            <Zap className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <h2 className="text-2xl font-bold">빠른 시작</h2>
              <p className="text-muted-foreground">
                개발 서버를 시작하고 첫 번째 페이지를 생성하세요.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 ml-9">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">설치</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>프로젝트를 클론하고 의존성을 설치합니다:</p>
                <code className="block bg-muted p-2 rounded">npm install</code>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">개발 서버</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>개발 서버를 시작합니다:</p>
                <code className="block bg-muted p-2 rounded">npm run dev</code>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 프로젝트 구조 */}
        <section className="space-y-6">
          <div className="flex gap-3 items-start">
            <Layers className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <h2 className="text-2xl font-bold">프로젝트 구조</h2>
              <p className="text-muted-foreground">
                Atomic Design 패턴으로 구조화된 컴포넌트 계층
              </p>
            </div>
          </div>
          <div className="ml-9 space-y-3 text-sm text-muted-foreground font-mono">
            <div>
              <div className="font-semibold text-foreground mb-2">components/</div>
              <div className="space-y-1 ml-4">
                <p>• ui/ - shadcn/ui 컴포넌트</p>
                <p>• atoms/ - 기본 컴포넌트</p>
                <p>• molecules/ - Atoms 조합</p>
                <p>• organisms/ - 독립 기능</p>
                <p>• templates/ - 레이아웃</p>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 기능 */}
        <section className="space-y-6">
          <div className="flex gap-3 items-start">
            <Code2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <h2 className="text-2xl font-bold">주요 기능</h2>
              <p className="text-muted-foreground">
                내장된 기능과 라이브러리들
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 ml-9">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">다크모드</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                next-themes를 사용한 자동 다크모드 지원
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">폼 검증</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                React Hook Form + Zod 통합
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">상태 관리</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Zustand를 사용한 경량 상태관리
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">토스트 알림</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Sonner를 사용한 토스트 알림
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 새로운 페이지 추가 */}
        <section className="space-y-6">
          <div className="flex gap-3 items-start">
            <BookOpen className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <h2 className="text-2xl font-bold">새로운 페이지 추가</h2>
              <p className="text-muted-foreground">
                라우트 그룹에 맞춰 새로운 페이지를 추가합니다.
              </p>
            </div>
          </div>
          <div className="ml-9 space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">마케팅 페이지:</p>
              <code className="text-xs">app/(marketing)/[name]/page.tsx</code>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">인증 페이지:</p>
              <code className="text-xs">app/(auth)/[name]/page.tsx</code>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">대시보드 페이지:</p>
              <code className="text-xs">app/(dashboard)/[name]/page.tsx</code>
            </div>
          </div>
        </section>

        {/* 추가 자료 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">추가 자료</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <a href="https://nextjs.org" className="text-blue-600 hover:underline">Next.js 공식 문서</a></p>
            <p>• <a href="https://react.dev" className="text-blue-600 hover:underline">React 공식 문서</a></p>
            <p>• <a href="https://tailwindcss.com" className="text-blue-600 hover:underline">Tailwind CSS 문서</a></p>
            <p>• <a href="https://ui.shadcn.com" className="text-blue-600 hover:underline">shadcn/ui 컴포넌트</a></p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
