# 프로젝트 패턴 및 코드 스멜 기록

## 확인된 좋은 패턴

### 폼 패턴
- 모든 폼은 `lib/validations/` 에 Zod 스키마 정의 후 `z.infer<typeof schema>`로 타입 추론
- `useForm<T>({ resolver: zodResolver(schema) })` 패턴 일관 적용
- try/catch/finally 패턴으로 isLoading 상태 관리
- `toast.success()` / `toast.error()` (sonner)로 사용자 피드백
- 비밀번호 필드: `autoComplete="current-password"` 또는 `"new-password"` 적용됨

### Atomic Design 준수
- atoms: Logo, ThemeToggle, LoadingSpinner (단일 기능)
- molecules: NavItemComponent, PageHeader, UserMenu (atoms 조합)
- organisms: Header, Footer, Sidebar, LoginForm, SignupForm, ContactForm, MobileDrawer
- templates: AuthLayout, DefaultLayout, DashboardLayout, PageWrapper
- 계층 간 역방향 의존성 없음

### TypeScript
- `strict: true` 활성화
- `any` 타입 사용 없음
- `ComponentType<{ className?: string }>` 패턴으로 아이콘 타입 처리
- 인터페이스는 `types/index.ts` 집중 관리

### 다크모드
- CSS 변수 (`--background`, `--foreground` 등) 기반으로 구현
- shadcn/ui 컴포넌트가 자동으로 다크모드 대응
- 일부 하드코딩 색상은 `dark:` 접두사로 대응 (예: `bg-white dark:bg-slate-950`)

### 상태 관리
- Zustand + persist 미들웨어로 사이드바 상태 영속화 (`stores/ui-store.ts`)
- `useIsMobile()` 훅으로 모바일 환경 감지 후 사이드바 강제 닫힘 처리

## 확인된 이슈 패턴 (개선 필요)

### cn() 미사용 패턴
파일: `components/atoms/logo.tsx`, `components/atoms/loading-spinner.tsx`,
      `components/molecules/nav-item.tsx`, `components/molecules/page-header.tsx`,
      `components/templates/page-wrapper.tsx`
문제: 템플릿 리터럴(`${}`)로 className 조합 -> Tailwind 클래스 충돌 가능성
권장: `cn("base-classes", className)` 패턴 사용

### 배열 인덱스를 key로 사용
파일: `components/molecules/page-header.tsx` (breadcrumbs map)
      `app/(dashboard)/dashboard/page.tsx` (최근 활동 목록)
      `app/(marketing)/faq/page.tsx` (faqs map)
문제: 리스트 재정렬 시 불필요한 리렌더링 발생 가능

### 설정 페이지 미완성 패턴
파일: `app/(dashboard)/dashboard/settings/page.tsx`
문제: 프로필 섹션이 React Hook Form 없이 raw Input/Label 사용, 저장 버튼에 실제 로직 없음
     알림 섹션이 shadcn Switch가 아닌 raw `<input type="checkbox">` 사용

### autoComplete 속성 누락
파일: `components/organisms/signup-form.tsx`
문제: 이름 필드에 `autoComplete="name"`, 이메일 필드에 `autoComplete="email"` 미적용
     (비밀번호 필드는 적용됨)

파일: `components/organisms/login-form.tsx`
문제: 이메일 필드에 `autoComplete="email"` 미적용 (`type="email"`은 있지만 autoComplete 없음)

### Props 인터페이스 정의 방식
패턴: 컴포넌트 Props를 인라인 타입으로 정의 (`({ prop }: { prop: type })`)
권장: `interface ComponentProps { ... }` 분리 정의가 재사용성과 가독성에 유리

### CSS 중복
파일: `app/globals.css`
문제: `@layer base` 블록 내 `@apply border-border outline-ring/50` 및
      `@apply bg-background text-foreground` 각각 2번 중복 작성

### 불필요한 레이아웃 레이어
파일: `app/(auth)/layout.tsx`
문제: Fragment만 반환하는 레이아웃 파일 - 의미없는 레이어, 삭제 검토 필요

### UserMenu 하드코딩
파일: `components/molecules/user-menu.tsx`
문제: 사용자 정보가 하드코딩되어 있고 Props로 받지 않음
      설정 메뉴 아이템이 실제 라우팅 없이 DropdownMenuItem으로만 존재

### Header 중복 렌더링 방어 로직
파일: `components/organisms/header.tsx`
문제: `isMobile` 기반으로 데스크톱 nav와 모바일 drawer를 조건부 렌더링하는데,
      nav는 `hidden md:flex`로 CSS로도 숨겨져 있어 중복 방어

### Logo 컴포넌트 variant 패턴
파일: `components/atoms/logo.tsx`
문제: `variant="light"` 시 `text-gray-700` 고정값 사용 (다크모드 미고려)
      `className` 결합 시 `cn()` 미사용

## 보안 관련
- console.log()로 폼 데이터 출력 (login-form, signup-form, contact-form) - 개발용 TODO이지만 프로덕션 빌드 전 제거 필요
- 실제 인증 구현 없음 (TODO 주석으로 표시됨) - 스타터킷 특성상 예정된 미구현
