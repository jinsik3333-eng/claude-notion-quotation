# Invoice-Web Development Guidelines

AI 에이전트용 개발 규칙 및 의사결정 기준 문서입니다.

---

## 1. 프로젝트 개요

**프로젝트명:** invoice-web

**목적:** Notion 데이터베이스의 견적서를 전문적인 웹 UI로 공유하고 PDF 다운로드 기능을 제공하는 서비스

**핵심 기술 스택:**
- Next.js 16 (App Router), React 19, TypeScript 5
- Styling: Tailwind CSS 4 + shadcn/ui
- Validation: Zod
- Notion: @notionhq/client (API 연동)
- Icons: Lucide React

---

## 2. 프로젝트 아키텍처

### 디렉토리 구조

```
invoice-web/
├── app/
│   ├── (public)/
│   │   └── quote/[id]/page.tsx          # 견적서 공개 뷰 (서버 컴포넌트)
│   ├── api/
│   │   └── quotes/[id]/route.ts         # 견적서 조회 API
│   ├── layout.tsx                       # 루트 레이아웃
│   ├── not-found.tsx                    # 404 페이지
│   └── globals.css                      # 전역 스타일 + 인쇄 CSS
│
├── components/                          # Atomic Design 계층 구조
│   ├── ui/                              # shadcn/ui 기본 컴포넌트
│   ├── atoms/                           # 최소 단위 컴포넌트
│   ├── molecules/
│   │   └── pdf-download-button.tsx      # PDF 다운로드 (클라이언트)
│   └── organisms/
│       ├── quote-view.tsx               # 견적서 전체 뷰
│       ├── quote-header.tsx             # 헤더 정보
│       ├── quote-items-table.tsx        # 항목 테이블
│       ├── quote-summary.tsx            # 금액 요약
│       └── quote-error.tsx              # 오류 안내
│
├── lib/
│   ├── notion/
│   │   ├── client.ts                    # Notion SDK 클라이언트 (서버 전용)
│   │   └── quote-mapper.ts              # Notion 응답 → Quote 타입 변환
│   ├── validations/
│   │   └── quote.ts                     # Zod 검증 스키마
│   └── constants/
│       └── quote.ts                     # 상수 (세율 등)
│
├── types/
│   └── quote.ts                         # Quote, QuoteItem 타입 정의
│
├── .env.example                         # 환경변수 템플릿
├── .env.local                           # 실제 환경변수 (커밋 금지)
├── package.json                         # 의존성 관리
└── CLAUDE.md                            # 프로젝트 개발 가이드
```

### 핵심 모듈 역할

| 모듈 | 역할 | 접근 권한 |
|------|------|----------|
| `lib/notion/client.ts` | Notion SDK 인스턴스 | 서버 사이드 전용 |
| `lib/notion/quote-mapper.ts` | API 응답 → 타입 변환 | 서버 사이드 |
| `lib/validations/quote.ts` | Zod 검증 스키마 | 서버/클라이언트 |
| `types/quote.ts` | TypeScript 타입 | 서버/클라이언트 |
| `app/api/quotes/[id]/route.ts` | 데이터 조회 API | 클라이언트에서 fetch |

---

## 3. 코드 표준

### 명명 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수/함수 | camelCase (영어) | `quoteNumber`, `getQuoteData` |
| 컴포넌트 | PascalCase (영어) | `QuoteView`, `PdfDownloadButton` |
| 상수 | UPPER_SNAKE_CASE (영어) | `TAX_RATE`, `DISCOUNT_PERCENT` |
| 파일명 | kebab-case (영어) | `pdf-download-button.tsx` |
| 주석/커밋 | 한국어 | `// 견적서 상태 검증` |

### 포맷팅

- **들여쓰기:** 2칸 (스페이스)
- **줄 길이:** 최대 100 문자 (권장)
- **문자열 따옴표:** 큰따옴표 (`"`)
- **Tailwind 클래스 병합:** `cn()` 유틸리티 사용 (직접 문자열 연결 금지)

### 주석 규칙

```typescript
// 한국어로 작성
// 비즈니스 로직 설명은 포함, 자명한 코드는 주석 불필요

// 좋은 예: 비즈니스 로직 설명
if (quote.status === 'draft') {
  // 미발송 견적서는 공개 접근 차단
  return notFound();
}

// 나쁜 예: 자명한 코드 주석
const name = quote.clientName; // 클라이언트 이름 설정
```

---

## 4. 기능 구현 표준

### 4.1 Notion 데이터 연동 (서버 사이드)

**필수 규칙:**
- `lib/notion/client.ts` 에서만 Notion 클라이언트 임포트 가능
- 클라이언트 컴포넌트에서는 API 라우트를 통해 데이터 접근
- 모든 응답은 `lib/validations/quote.ts` Zod 스키마로 검증

**Notion 클라이언트 사용:**
```typescript
// lib/notion/client.ts - 서버 사이드에서만 사용
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const notion;

// app/api/quotes/[id]/route.ts - API에서만 import 가능
import { notion } from '@/lib/notion/client'; // ✅ 가능

// components/molecules/pdf-download-button.tsx - 금지
import { notion } from '@/lib/notion/client'; // ❌ 불가능
```

### 4.2 견적서 상태 필터링

**접근 제어 규칙:**
```typescript
const quote = await getQuoteData(id);

// draft 상태는 공개 접근 차단
if (quote.status === 'draft') {
  notFound(); // 404로 처리
}

// sent, accepted 상태만 공개 허용
if (!['sent', 'accepted'].includes(quote.status)) {
  notFound();
}
```

### 4.3 PDF 다운로드 (클라이언트 사이드)

**구현 방식:**
```typescript
'use client';

// window.print() 활용
document.title = `견적서_${quote.quoteNumber}_${quote.clientName}`;
window.print();

// Tailwind print 유틸리티로 인쇄 시 UI 숨기기
<div className="print:hidden">
  {/* PDF 다운로드 버튼 등 */}
</div>
```

### 4.4 데이터 흐름

```
클라이언트 요청
    ↓
app/api/quotes/[id]/route.ts (GET)
    ↓
lib/notion/client.ts (Notion API 호출)
    ↓
lib/validations/quote.ts (Zod 검증)
    ↓
lib/notion/quote-mapper.ts (타입 변환)
    ↓
JSON 응답
    ↓
컴포넌트 렌더링
```

---

## 5. 프레임워크/라이브러리 사용 표준

### 5.1 Next.js App Router

```typescript
// 서버 컴포넌트 (기본값)
export default async function QuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Notion API 호출, DB 쿼리 등 서버 사이드 작업
  return <QuoteView quote={quote} />;
}

// ISR 캐싱 설정
export const revalidate = 60; // 60초마다 재검증
```

### 5.2 React 훅 (클라이언트 컴포넌트에서만)

```typescript
'use client'; // 훅 사용 시 필수

// useState, useEffect 등은 클라이언트 컴포넌트에서만 사용
const [isLoading, setIsLoading] = useState(false);
```

### 5.3 Tailwind CSS + cn()

```typescript
import { cn } from '@/lib/utils';

// cn() 유틸리티로 조건부 클래스 병합
<div className={cn(
  'base-padding-4 base-rounded',
  isActive && 'bg-blue-500',
  className
)}>
  {/* content */}
</div>

// ❌ 금지: 직접 문자열 연결
className={`p-4 rounded ${isActive ? 'bg-blue-500' : ''}`}
```

### 5.4 shadcn/ui 컴포넌트

- `components/ui/` 디렉토리에 설치
- Button, Table 등 기본 UI 요소 사용
- 커스터마이징 필요 시 Tailwind CSS로 오버라이드

### 5.5 Zod 검증

```typescript
import { z } from 'zod';

// lib/validations/quote.ts
export const QuoteSchema = z.object({
  id: z.string(),
  quoteNumber: z.string(),
  clientName: z.string(),
  status: z.enum(['draft', 'sent', 'accepted']),
  // ...
});

// 검증 사용
const result = QuoteSchema.parse(notionData);
if (!result) throw new Error('Invalid quote data');
```

---

## 6. 워크플로우 표준

### 6.1 서버/클라이언트 컴포넌트 분리

```
서버 컴포넌트 (app/)
  ├─ Notion API 호출
  ├─ 데이터베이스 쿼리
  └─ 타입 변환
        ↓
    클라이언트 컴포넌트 (components/)
      ├─ UI 렌더링
      ├─ 상호작용 처리
      └─ window.print() (PDF)
```

### 6.2 새 컴포넌트 추가 프로세스

**Atomic Design 계층:**
1. **atoms** (components/atoms/) - 단일 스타일 요소만
2. **molecules** (components/molecules/) - atoms 조합 + 간단한 상호작용
3. **organisms** (components/organisms/) - 복잡한 상태 관리 컴포넌트
4. **ui** (components/ui/) - shadcn/ui 설치 컴포넌트

**추가 방법:**
```bash
# add-component 스킬 사용 (자동 폴더 선택)
# 또는 수동으로 파일 생성
touch components/atoms/component-name.tsx
```

### 6.3 커밋 프로세스

```bash
# git:commit 스킬 사용 (이모지 + 한국어 메시지)
# 예: 🔧 fix: PDF 다운로드 파일명 버그 수정

# 또는 수동 커밋
git commit -m "$(cat <<'EOF'
🚀 feat: 견적서 상태 검증 기능 추가

- draft 상태 공개 접근 차단
- sent/accepted 상태만 공개 허용

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## 7. 핵심 파일 상호작용

### 7.1 Notion 데이터 스키마 변경 시

**동시 수정 파일:**
- `types/quote.ts` - TypeScript 인터페이스 업데이트
- `lib/validations/quote.ts` - Zod 스키마 업데이트
- `lib/notion/quote-mapper.ts` - 매핑 로직 업데이트
- `app/api/quotes/[id]/route.ts` - API 응답 확인

### 7.2 UI 컴포넌트 재사용 시

**의존 관계:**
```
organisms/quote-view.tsx (메인)
  ├─ organisms/quote-header.tsx
  ├─ organisms/quote-items-table.tsx
  ├─ organisms/quote-summary.tsx
  └─ molecules/pdf-download-button.tsx
      └─ ui/button.tsx
```

### 7.3 타입 변경 시

**변경 순서:**
1. `types/quote.ts` - 기본 타입 수정
2. `lib/validations/quote.ts` - 검증 스키마 수정
3. `lib/notion/quote-mapper.ts` - 변환 로직 수정
4. 컴포넌트 props 타입 수정
5. 테스트/검증

---

## 8. AI 의사결정 기준

### 8.1 서버/클라이언트 컴포넌트 선택

| 상황 | 판단 기준 | 결정 |
|------|----------|------|
| Notion API 호출 필요 | 반드시 서버 필요 | **Server Component** |
| DB 쿼리 필요 | 반드시 서버 필요 | **Server Component** |
| 환경변수 접근 | 반드시 서버 필요 | **Server Component** |
| 훅(useState 등) 사용 | 클라이언트만 지원 | **Client Component** |
| 사용자 상호작용 | 클라이언트 권장 | **Client Component** |
| 순수 UI 렌더링 | 서버 권장 (성능) | **Server Component** |

### 8.2 컴포넌트 폴더 선택

```
데이터 저장 상태가 필요한가?
  → YES: organisms/
  → NO: 단순 조합인가?
      → YES: molecules/
      → NO: 단순 스타일?
          → YES: atoms/
          → NO: shadcn/ui 컴포넌트?
              → YES: ui/
```

### 8.3 API 라우트 vs 서버 액션

- **API 라우트 사용:** 클라이언트 컴포넌트에서 fetch 필요
- **Server Action 고려:** 서버 컴포넌트 내 단순 작업

```typescript
// 이 프로젝트에서는 주로 API 라우트 사용
// app/api/quotes/[id]/route.ts
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // ...
}
```

### 8.4 오류 처리

**우선순위:**
1. 타입 검증 (Zod) - 프론트
2. 비즈니스 로직 검증 - 백엔드
3. 사용자 친화적 오류 메시지 - UI

```typescript
// 오류 처리 예시
try {
  const quoteData = await getQuoteData(id);

  // 유효성 검증
  if (!quoteData) {
    return notFound();
  }

  // 상태 검증
  if (quoteData.status === 'draft') {
    return notFound();
  }

  return <QuoteView quote={quoteData} />;
} catch (error) {
  // 서버 오류 로깅 및 사용자 오류 화면 표시
  console.error('Failed to load quote:', error);
  return <QuoteError />;
}
```

---

## 9. 금지 사항

### 9.1 절대 금지

| 행동 | 이유 | 대체 방안 |
|------|------|----------|
| `any` 타입 사용 | 타입 안전성 훼손 | 구체적 타입 정의 |
| 클라이언트 컴포넌트에서 Notion 임포트 | 보안 위반 (API Key 노출) | API 라우트 사용 |
| 환경변수 하드코딩 | 보안 위반 | `.env.local` 사용 |
| Tailwind 클래스 직접 연결 | 빌드 최적화 불가 | `cn()` 유틸리티 사용 |
| draft 상태 공개 | 비즈니스 로직 위반 | `notFound()` 반환 |
| 직접 DOM 조작 | React 렌더링 상충 | React state 사용 |

### 9.2 코드 수준 금지

```typescript
// ❌ 금지: any 타입
const data: any = apiResponse;

// ✅ 올바름: 구체적 타입
interface QuoteData {
  id: string;
  status: 'draft' | 'sent' | 'accepted';
}
const data: QuoteData = apiResponse;

// ❌ 금지: Tailwind 클래스 직접 연결
className={`p-4 ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}

// ✅ 올바름: cn() 사용
className={cn('p-4', isActive ? 'bg-blue-500' : 'bg-gray-200')}

// ❌ 금지: 클라이언트에서 Notion 임포트
'use client';
import { notion } from '@/lib/notion/client';

// ✅ 올바름: API 라우트 사용
'use client';
const response = await fetch(`/api/quotes/${id}`);
const quote = await response.json();

// ❌ 금지: draft 상태 공개
if (quote.status === 'draft') {
  return <QuoteView quote={quote} />; // 공개 가능
}

// ✅ 올바름: draft 차단
if (quote.status === 'draft') {
  return notFound();
}
```

### 9.3 커밋/배포 금지

- `.env.local` 파일 커밋 (`.gitignore`에 포함)
- 미테스트 코드 배포
- 주석 처리된 디버그 코드 커밋
- 환경별 경로 하드코딩

---

## 10. 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드 검사
npm run build
npm start

# 린트 검사
npm run lint
npm run lint -- --fix

# 타입 검사
npx tsc --noEmit
```

---

## 11. 환경 설정

### 필수 환경변수 (.env.local)

```bash
# .env.local - 커밋 금지
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_QUOTE_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 개발 환경

- Node.js: v18+ (권장: v20+)
- npm: v9+ 또는 yarn, pnpm
- 브라우저: Chrome, Firefox, Safari 최신 버전

---

## 12. 추가 리소스

- 프로젝트 상세 가이드: `@/CLAUDE.md`
- 제품 요구사항: `@/docs/PRD.md`
- Notion API 문서: [notion.so/developers](https://developers.notion.com)
- shadcn/ui: [shadcn/ui](https://ui.shadcn.com)
