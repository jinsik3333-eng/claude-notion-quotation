import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWrapper } from "@/components/templates/page-wrapper";
import { ArrowRight, Code2, Palette, Zap } from "lucide-react";
import Link from "next/link";

/**
 * 랜딩 페이지
 */
export default function Home() {
  return (
    <PageWrapper>
      {/* 히어로 섹션 */}
      <section className="space-y-6 text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          모던{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Next.js 스타터킷
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Atomic Design, shadcn/ui, TypeScript로 빠르게 시작하는 웹 개발
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/about">
            <Button size="lg">
              자세히 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              문의하기
            </Button>
          </Link>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader>
            <Code2 className="h-8 w-8 mb-2 text-blue-600" />
            <CardTitle>현대적 스택</CardTitle>
            <CardDescription>
              Next.js 16 + React 19 + TypeScript
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              최신 기술 스택으로 구축되어 빠르고 안정적인 개발 경험을 제공합니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Palette className="h-8 w-8 mb-2 text-purple-600" />
            <CardTitle>디자인 시스템</CardTitle>
            <CardDescription>
              shadcn/ui + Tailwind CSS 4
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              재사용 가능한 컴포넌트로 일관성 있는 UI를 빠르게 구축하세요.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 mb-2 text-yellow-600" />
            <CardTitle>개발 생산성</CardTitle>
            <CardDescription>
              Atomic Design + 폼 검증
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              구조화된 컴포넌트 계층으로 개발 속도를 높이세요.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 포함 기능 */}
      <section className="space-y-6 mb-16">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">포함된 기능</h2>
          <p className="text-muted-foreground">
            즉시 사용 가능한 컴포넌트와 기능들
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <div>
              <h3 className="font-semibold">다크모드</h3>
              <p className="text-sm text-muted-foreground">
                next-themes로 자동 지원
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <div>
              <h3 className="font-semibold">폼 검증</h3>
              <p className="text-sm text-muted-foreground">
                React Hook Form + Zod
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <div>
              <h3 className="font-semibold">전역 상태관리</h3>
              <p className="text-sm text-muted-foreground">
                Zustand로 경량 구현
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <div>
              <h3 className="font-semibold">알림</h3>
              <p className="text-sm text-muted-foreground">
                Sonner Toast 통합
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <div>
              <h3 className="font-semibold">반응형 디자인</h3>
              <p className="text-sm text-muted-foreground">
                모든 기기에 최적화됨
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <div>
              <h3 className="font-semibold">TypeScript</h3>
              <p className="text-sm text-muted-foreground">
                완전한 타입 안전성
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 md:p-12 text-white text-center space-y-4">
        <h2 className="text-3xl font-bold">지금 시작하세요</h2>
        <p className="text-blue-100 max-w-xl mx-auto">
          이 스타터킷으로 당신의 다음 프로젝트를 빠르게 시작하세요.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/about">
            <Button size="lg" variant="secondary">
              자세히 알아보기
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
              연락하기
            </Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
