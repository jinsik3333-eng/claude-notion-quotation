# invoice-web

Notion 견적서 웹 공유 & PDF 다운로드 서비스

관리자가 Notion 데이터베이스에 입력한 견적서 데이터를 클라이언트가 별도 계정 없이 공개 링크로 웹 브라우저에서 확인하고 PDF로 다운로드할 수 있는 기능을 제공합니다.

## 프로젝트 개요

**목적**: Notion 견적서를 전문적인 웹 UI로 클라이언트에게 공유하고 PDF 저장 기능 제공

**범위 (MVP)**:
- 공개 링크를 통한 견적서 조회 (인증 불필요)
- 웹 UI에서 전문적인 견적서 렌더링
- PDF 다운로드 (브라우저 print)
- 기본 정보: 견적번호, 고객명, 금액, 항목, 유효기간

**사용자**:
- 관리자: Notion에서 견적서 작성 후 공유 링크 전달
- 클라이언트: 링크로 견적서 확인 및 PDF 저장

## 주요 페이지

1. **견적서 공개 뷰** (`/quote/[id]`) - 견적번호, 고객정보, 항목 테이블, 금액 합계, PDF 다운로드
2. **404 오류 페이지** - 존재하지 않는 견적서 접근 시 안내

## 핵심 기능

- 견적서 조회: 인증 없이 Notion 페이지 ID로 견적서 데이터 조회
- 항목 렌더링: 항목명, 단가, 수량, 금액을 테이블 형태로 표시
- 금액 계산: 소계, 부가세(10%), 총액 자동 계산
- PDF 다운로드: 브라우저 print를 활용한 원클릭 PDF 저장
- 상태 필터링: `draft` 상태 견적서는 공개 접근 차단
- SEO 차단: `/quote/` 경로를 robots.txt로 검색 엔진 색인 차단

## 기술 스택

- Framework: Next.js 16 (App Router)
- Runtime: React 19
- Language: TypeScript 5
- Styling: TailwindCSS v4
- UI Components: shadcn/ui
- Validation: Zod
- Notion: @notionhq/client
- Icons: Lucide React

## 시작하기

```bash
# 의존성 설치
npm install

# Notion SDK 설치 (Phase 1)
npm install @notionhq/client

# 환경변수 설정
cp .env.example .env.local
# .env.local 파일에서 NOTION_API_KEY, NOTION_QUOTE_DATABASE_ID 입력

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 환경변수

```bash
# .env.local
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_QUOTE_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 프로젝트 구조

```
app/
├── (public)/
│   └── quote/[id]/page.tsx    # 견적서 공개 뷰 (서버 컴포넌트)
├── api/quotes/[id]/route.ts   # 견적서 조회 API (선택적)
├── layout.tsx                 # 루트 레이아웃
├── not-found.tsx              # 404 페이지
└── globals.css                # 전역 스타일 + 인쇄 CSS

components/
├── ui/                        # shadcn/ui 기본 컴포넌트
├── atoms/
│   └── loading-spinner.tsx
├── molecules/
│   └── pdf-download-button.tsx  # PDF 다운로드 버튼 (클라이언트)
└── organisms/
    ├── quote-view.tsx          # 견적서 전체 뷰
    ├── quote-header.tsx        # 헤더 (견적번호, 날짜, 고객정보)
    ├── quote-items-table.tsx   # 항목 테이블
    ├── quote-summary.tsx       # 금액 요약 (소계/세금/합계)
    └── quote-error.tsx         # 오류 안내

lib/
├── notion/
│   ├── client.ts              # Notion SDK 클라이언트
│   └── quote-mapper.ts        # Notion 응답 → Quote 타입 변환
├── validations/quote.ts       # Zod 검증 스키마
└── constants/quote.ts         # 세율 등 상수

types/
└── quote.ts                   # Quote, QuoteItem 타입 정의
```

## 개발 상태

- 기본 프로젝트 구조 설정 완료
- 견적서 컴포넌트 기반 파일 생성 완료
- Notion API 연동 구현 예정 (Phase 1-2)
- 실제 견적서 렌더링 구현 예정 (Phase 3-4)

## 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 가이드](./CLAUDE.md) - 개발 지침
