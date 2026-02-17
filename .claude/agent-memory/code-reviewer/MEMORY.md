# 코드 리뷰어 에이전트 메모리

## 프로젝트 개요
- Next.js 16.1.6 + React 19.2.3 스타터킷
- Atomic Design 패턴 (atoms/molecules/organisms/templates)
- 라우트 그룹: (auth), (marketing), (dashboard)
- 자세한 패턴은 patterns.md 참조

## 핵심 파일 경로
- 전역 타입: `types/index.ts` (NavItem, SiteConfig, User)
- 스타일 유틸: `lib/utils.ts` (cn 함수)
- 검증 스키마: `lib/validations/auth.ts`, `lib/validations/contact.ts`
- 네비게이션: `lib/constants/nav.ts`
- Zustand 스토어: `stores/ui-store.ts`
- 커스텀 훅: `hooks/use-mobile.ts`, `hooks/use-debounce.ts`, `hooks/use-local-storage.ts`

## 반복적으로 발견된 이슈
- `logo.tsx`, `loading-spinner.tsx` 등 일부 atoms에서 `cn()` 대신 템플릿 리터럴로 className 결합
- `PageHeader`, `NavItemComponent` 등 molecules에서 `cn()` 미사용
- `page-header.tsx`의 breadcrumb `map`에 배열 인덱스를 key로 사용
- `settings/page.tsx`에 React Hook Form 없이 raw Input/Label 사용 (프로파일 섹션)
- `globals.css`에 `@apply` 규칙 중복 작성
- `(auth)/layout.tsx`가 Fragment만 반환하는 불필요한 레이어
- `user-menu.tsx`에 하드코딩된 사용자 데이터 (TODO 주석 있음)
- `LoginForm`에 `autoComplete="email"` 미적용 (이메일 필드)
- `signup-form.tsx`에 이름 필드 `autoComplete` 속성 누락

## 전반적인 품질 평가
- TypeScript strict 모드 활성화, any 타입 없음 (우수)
- 폼 패턴 (React Hook Form + Zod) 일관성 우수
- 다크모드 지원은 CSS 변수 기반으로 적절히 구현
- `"use client"` 지정 대체로 적절
- 자세한 내용은 patterns.md 참조
