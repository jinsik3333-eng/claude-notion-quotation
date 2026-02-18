# CLAUDE.md

**invoice-web**는 Notion 견적서를 전문적인 웹 UI로 공유하고 PDF 다운로드를 제공하는 서비스입니다.

상세 프로젝트 요구사항은 @/docs/PRD.md 참조

---

## 핵심 기술 스택

- Next.js 16 (App Router), React 19, TypeScript 5
- Styling: Tailwind CSS 4 + shadcn/ui
- Validation: Zod
- Notion: @notionhq/client (설치 필요)
- Icons: Lucide React

---

## 필수 명령어

```bash
# 개발
npm run dev          # 개발 서버 실행 (http://localhost:3000)

# 빌드
npm run build        # 프로덕션 빌드
npm start            # 프로덕션 서버 실행

# 린트
npm run lint         # ESLint 검사
npm run lint -- --fix  # 자동 수정

# 타입 검사
npx tsc --noEmit     # TypeScript 오류 확인
```

---

## 프로젝트 구조

```
app/
├── (public)/
│   └── quote/[id]/page.tsx    # 견적서 공개 뷰 (서버 컴포넌트)
├── api/quotes/[id]/route.ts   # 견적서 조회 API
├── layout.tsx                 # 루트 레이아웃
├── not-found.tsx              # 404 페이지
└── globals.css                # 전역 스타일 + 인쇄 CSS

components/                    # Atomic Design 계층 구조
├── ui/                        # shadcn/ui 기본 컴포넌트
├── atoms/                     # 최소 단위 컴포넌트
├── molecules/
│   └── pdf-download-button.tsx  # PDF 다운로드 (클라이언트 컴포넌트)
└── organisms/
    ├── quote-view.tsx          # 견적서 전체 뷰
    ├── quote-header.tsx        # 헤더 정보
    ├── quote-items-table.tsx   # 항목 테이블
    ├── quote-summary.tsx       # 금액 요약
    └── quote-error.tsx         # 오류 안내

lib/
├── notion/
│   ├── client.ts              # Notion SDK 클라이언트 (서버 전용)
│   └── quote-mapper.ts        # Notion 응답 → Quote 타입 변환
├── validations/quote.ts       # Zod 검증 스키마
└── constants/quote.ts         # 상수 (세율 등)

types/
└── quote.ts                   # Quote, QuoteItem 타입 정의
```

---

## 컴포넌트 추가 규칙 (Atomic Design)

1. **shadcn/ui 기본 요소** (button, input, table 등) -> `components/ui/`
2. **단일 스타일 요소** -> `components/atoms/`
3. **atoms 조합** -> `components/molecules/`
4. **상태/로직 포함 복합 컴포넌트** -> `components/organisms/`
5. **레이아웃 래퍼** -> `components/templates/`

**컴포넌트 기본 구조:**

```typescript
"use client"; // 훅 사용 시에만 추가
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
}

export function ComponentName({ className }: ComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {/* content */}
    </div>
  );
}
```

---

## Notion API 개발 가이드

### 환경변수 설정

```bash
# .env.local
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_QUOTE_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Notion 클라이언트 사용 (서버 전용)

```typescript
// lib/notion/client.ts - 서버 사이드에서만 import
import { notion } from "@/lib/notion/client";

// 페이지 조회
const page = await notion.pages.retrieve({ page_id: id });
```

### 견적서 상태 필터링

- `draft` 상태 견적서는 `notFound()` 반환 (공개 접근 차단)
- `sent`, `accepted` 상태만 공개 접근 허용

---

## 핵심 패턴

### 서버 컴포넌트에서 Notion 데이터 조회

```typescript
// app/(public)/quote/[id]/page.tsx
export const revalidate = 60; // 60초 캐싱

export default async function QuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Notion API 호출 후 QuoteView 렌더링
}
```

### PDF 다운로드 (클라이언트 컴포넌트)

```typescript
"use client";
// document.title 임시 변경으로 PDF 파일명 자동화
document.title = `견적서_${quote.quoteNumber}_${quote.clientName}`;
window.print();
```

### 인쇄 시 숨길 요소

```tsx
// Tailwind print 유틸리티 사용
<div className="print:hidden">PDF 다운로드 버튼</div>
```

---

## 타입 안전성 규칙

- `any` 타입 사용 금지
- `types/quote.ts`의 `Quote`, `QuoteItem` 인터페이스 사용
- Notion API 응답은 `lib/validations/quote.ts` Zod 스키마로 검증
- `lib/notion/quote-mapper.ts`에서 Notion 응답 → Quote 타입 변환

---

## 디버깅

- **빌드 오류**: `npm run build` 로컬 실행
- **타입 오류**: `npx tsc --noEmit`
- **Notion API 오류**: `/api/quotes/[실제ID]` 접근하여 응답 확인
- **스타일 충돌**: `cn()` 유틸리티 사용 (직접 문자열 연결 금지)
- **인쇄 레이아웃**: 브라우저 DevTools의 인쇄 미리보기 활용
