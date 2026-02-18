# invoice-web 개발 로드맵

Notion 견적서를 전문적인 웹 UI로 공유하고 PDF 다운로드를 제공하는 MVP 서비스

## 개요

**invoice-web**은 프리랜서/소규모 사업자를 위한 견적서 공유 서비스로 다음 기능을 제공합니다:

- **공개 견적서 조회**: Notion 데이터베이스의 견적서를 인증 없이 고유 링크로 웹에서 조회
- **견적서 렌더링**: 항목 테이블, 금액 합계(소계/부가세/총액)를 전문적인 UI로 표시
- **PDF 다운로드**: 브라우저 print 기반 원클릭 PDF 생성 및 파일명 자동화
- **오류 처리**: 존재하지 않는 견적서 ID 접근 시 명확한 안내 화면 제공

**기술 스택:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui, @notionhq/client, Zod

**예상 총 소요 기간:** 5.5일

---

## 개발 워크플로우

1. **작업 계획**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조

3. **작업 구현**

   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - **구현 완료 후 즉시 Playwright MCP로 브라우저 실행하여 기능 검증 (의무)**
   - **browser_navigate → browser_snapshot → browser_click/fill → 결과 검증 순서로 진행**
   - **테스트 실패 시 수정 후 재테스트, 통과 확인 후 다음 작업으로 이동**
   - **각 시나리오별 browser_take_screenshot으로 결과 기록**
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

   - 로드맵에서 완료된 작업을 완료로 표시

---

## 개발 단계

### Phase 1: 기반 설정 (예상 소요: 1일) -- 완료

- **Task 001: 프로젝트 구조 및 라우팅 설정** -- 완료
  - See: `/tasks/001-project-structure.md`
  - 완료: Next.js App Router 기반 라우트 구조 생성
    - `app/(public)/layout.tsx` - 공개 페이지 레이아웃 (테마 강제 라이트 모드)
    - `app/(public)/quote/[id]/page.tsx` - 견적서 공개 뷰 페이지 (플레이스홀더)
    - `app/api/quotes/[id]/route.ts` - 견적서 조회 API (플레이스홀더)
    - `app/not-found.tsx` - 404 페이지
  - 완료: `.env.example` 파일 생성 (NOTION_API_KEY, NOTION_QUOTE_DATABASE_ID)
  - 완료: `robots.txt`에 `/quote/` 경로 차단 설정

- **Task 002: 타입 정의 및 검증 스키마 설계** -- 완료
  - See: `/tasks/002-type-definitions.md`
  - 완료: `types/quote.ts` - Quote, QuoteItem, QuoteStatus 타입 정의
  - 완료: `lib/validations/quote.ts` - Zod 검증 스키마 (notionIdSchema 포함)
  - 완료: `lib/constants/quote.ts` - 상수 정의 (DEFAULT_TAX_RATE, QUOTE_STATUS_LABELS, QUOTE_CACHE_REVALIDATE_SECONDS)

- **Task 003: Notion SDK 설치 및 클라이언트 초기화** -- 완료
  - See: `/tasks/003-notion-client.md`
  - 완료: `@notionhq/client` 패키지 설치
  - 완료: `lib/notion/client.ts` - Notion API 클라이언트 싱글톤 (환경변수 검증 포함)
  - 완료: `lib/notion/quote-mapper.ts` - Notion 페이지 응답에서 Quote 타입 변환 함수 구현
    - Rich Text 추출, 날짜 파싱, Select 속성 변환
    - 항목(items)은 외부에서 전달받는 구조로 설계

### Phase 2: UI 컴포넌트 구현 (예상 소요: 2일) -- 완료

- **Task 004: shadcn/ui Table 컴포넌트 추가 및 공통 UI 설정** -- 완료
  - See: `/tasks/004-ui-components.md`
  - 완료: `components/ui/table.tsx` - shadcn/ui Table 컴포넌트 설치
  - 완료: `components/ui/separator.tsx` - Separator 컴포넌트 설치
  - 완료: `components/ui/button.tsx` - Button 컴포넌트 (기존 설치됨)
  - 완료: `components/atoms/loading-spinner.tsx` - 로딩 스피너 컴포넌트

- **Task 005: 견적서 UI 컴포넌트 구현 (더미 데이터 활용)** -- 완료
  - See: `/tasks/005-quote-components.md`
  - 완료: `components/organisms/quote-header.tsx` - 견적번호, 발행일, 유효기간, 고객 정보 표시
  - 완료: `components/organisms/quote-items-table.tsx` - 항목 테이블 (금액 천단위 콤마 포맷, 빈 항목 안내 메시지)
  - 완료: `components/organisms/quote-summary.tsx` - 소계/부가세/총액 요약 (원화 표기)
  - 완료: `components/organisms/quote-error.tsx` - FileX 아이콘 기반 오류 안내 컴포넌트
  - 완료: `components/molecules/pdf-download-button.tsx` - window.print() + document.title 파일명 자동화
  - 완료: `components/organisms/quote-view.tsx` - 전체 뷰 통합 (헤더, 테이블, 요약, PDF 버튼, 발행자 정보)

- **Task 006: 인쇄/PDF 스타일 및 반응형 레이아웃 완성** -- 완료
  - See: `/tasks/006-print-styles.md`
  - 완료: `app/globals.css` - @media print 스타일 추가
    - @page A4 사이즈 및 마진 설정
    - PDF 다운로드 버튼 인쇄 시 숨김
    - 견적서 컨테이너 인쇄 최적화 (그림자 제거, 테이블 페이지 나누기 방지)
    - 다크모드에서 강제 라이트 테마 적용
    - print-color-adjust 설정
  - 완료: 견적서 뷰 컴포넌트에 print:hidden, print:py-0 등 Tailwind print 유틸리티 적용
  - 완료: 항목 테이블 overflow-x-auto로 모바일 가로 스크롤 허용

### Phase 3: 데이터 조회 레이어 구현 (예상 소요: 1일)

- **Task 007: Notion 견적 항목(Line Items) 조회 로직 구현** - 우선순위
  - 관련 파일: `lib/notion/quote-mapper.ts`, `lib/notion/client.ts`
  - Notion 데이터베이스에서 견적 항목 조회 함수 구현
    - 옵션 A (관계형 DB): 별도 Line Items 데이터베이스에서 `database.query()` + Relation 필터로 조회
    - 옵션 B (블록 테이블): `blocks.children.list()`로 페이지 본문 테이블 블록 파싱
  - 항목 데이터를 QuoteItem[] 타입으로 변환하는 매핑 함수 구현
  - 항목이 0개인 경우 빈 배열 반환 처리
  - 옵션 B 선택 시: Rich Text에서 숫자 추출 (천단위 콤마 제거), 유효하지 않은 입력 기본값 0 처리
  - Zod 스키마(`quoteItemSchema`)로 각 항목 런타임 검증

- **Task 008: 견적서 통합 조회 함수 및 API 라우트 구현** - 우선순위
  - 관련 파일: `app/api/quotes/[id]/route.ts`, `lib/notion/client.ts`
  - `getQuote(id: string): Promise<Quote | null>` 통합 조회 함수 구현
    - 1) Notion 페이지 조회 (`pages.retrieve`)
    - 2) draft 상태 필터링 (draft이면 null 반환)
    - 3) 견적 항목 조회 (Task 007에서 구현한 함수 사용)
    - 4) `mapPageToQuote()` + 항목 데이터로 Quote 객체 생성
    - 5) `quoteSchema`로 최종 Zod 검증
  - API 라우트 GET 핸들러 완성
    - 성공: 200 + Quote JSON 응답
    - 존재하지 않는 ID: 404 + `{ error: "NOT_FOUND", message: "견적서를 찾을 수 없습니다." }`
    - 서버 오류: 500 + `{ error: "INTERNAL_ERROR", message: "데이터 조회 중 오류가 발생했습니다." }`
  - Playwright MCP를 활용한 API 엔드포인트 통합 테스트

### Phase 4: 페이지 통합 및 연동 (예상 소요: 1일)

- **Task 009: 견적서 공개 뷰 페이지 Notion API 연동**
  - 관련 파일: `app/(public)/quote/[id]/page.tsx`
  - 플레이스홀더를 실제 Notion API 연동으로 교체
    - `getQuote(id)` 호출로 견적서 데이터 조회
    - 데이터가 없으면 `notFound()` 호출
    - 정상 데이터면 `<QuoteView quote={quote} />` 렌더링
  - `generateMetadata()` 함수 구현
    - 동적 메타데이터: 견적서 제목, 견적번호 기반 title 설정
    - `robots: { index: false, follow: false }` 유지
    - noindex 태그로 검색 엔진 색인 차단
  - `revalidate = 60` 설정으로 60초 ISR 캐싱 적용
  - draft 상태 견적서 접근 시 404 반환 확인
  - Playwright MCP로 전체 사용자 플로우 E2E 테스트 수행

- **Task 010: 데이터 조회 및 UI 통합 검증**
  - Notion 데이터베이스에 테스트용 견적서 1~2건 입력 (sent 상태)
  - 실제 Notion 데이터로 견적서 페이지 렌더링 확인
    - 헤더 정보 (견적번호, 발행일, 유효기간, 고객명) 정확성 검증
    - 항목 테이블 (항목명, 단가, 수량, 금액) 정확성 검증
    - 금액 요약 (소계, 부가세, 총액) 계산 정확성 검증
  - 더미 데이터에서 실제 API 데이터로 전환 시 UI 깨짐 없음 확인
  - PDF 다운로드 동작 확인 (Chrome, Firefox에서 파일명 자동화 검증)
  - Playwright MCP를 활용한 통합 테스트
    - 정상 플로우: URL 접속 -> 견적서 렌더링 -> PDF 다운로드
    - 오류 플로우: 잘못된 ID 접근 -> 404 오류 페이지 표시
    - draft 상태 견적서 접근 -> 404 반환 확인

### Phase 5: 테스트 및 마무리 (예상 소요: 0.5일)

- **Task 011: 최종 품질 검증 및 정리**
  - 브라우저 호환성 테스트
    - Chrome (Windows/Mac): PDF 파일명 자동화 (`견적서_Q-2026-001_홍길동.pdf`)
    - Firefox: window.print() 동작 확인
    - Safari (Mac/iOS): 인쇄 레이아웃 확인
    - Edge: CSS 적용 확인
  - 모바일 반응형 테스트
    - 320px ~ 1440px 범위에서 레이아웃 검증
    - 항목 테이블 가로 스크롤 정상 동작
  - 코드 품질 검증
    - `npx tsc --noEmit` - TypeScript 오류 0개 확인
    - `npm run lint` - ESLint 경고/오류 0개 확인
    - `npm run build` - 프로덕션 빌드 성공 확인
    - 불필요한 console.log 제거
  - 보안 검증
    - 브라우저 소스 코드에서 NOTION_API_KEY 노출 없음 확인
    - robots.txt에 `/quote/` 차단 설정 확인
    - 견적서 페이지 메타데이터 noindex 확인
  - 성능 검증
    - 견적서 페이지 초기 로딩 2초 이내 (Notion API 포함)
    - PDF 생성 시간 3초 이내
  - Playwright MCP 최종 E2E 테스트
    - 전체 사용자 시나리오 (정상 플로우 + 오류 플로우) 통과 확인

---

## 현재 진행 상황

| Phase | 상태 | 예상 소요 |
|-------|------|----------|
| Phase 1: 기반 설정 | 완료 | 1일 |
| Phase 2: UI 컴포넌트 구현 | 완료 | 2일 |
| Phase 3: 데이터 조회 레이어 구현 | 대기 | 1일 |
| Phase 4: 페이지 통합 및 연동 | 대기 | 1일 |
| Phase 5: 테스트 및 마무리 | 대기 | 0.5일 |

**다음 작업:** Task 007 (Notion 견적 항목 조회 로직 구현)

---

## 의존성 관계

```
Task 001 (프로젝트 구조) ──> Task 002 (타입 정의) ──> Task 003 (Notion 클라이언트)
                                                           │
Task 004 (공통 UI) ──> Task 005 (견적서 컴포넌트) ──> Task 006 (인쇄 스타일)
                                                           │
                          Task 007 (항목 조회 로직) ────────┤
                                │                          │
                          Task 008 (통합 조회 + API) ──────┤
                                │                          │
                          Task 009 (페이지 연동) ──────────┤
                                │                          │
                          Task 010 (통합 검증) ────────────┤
                                │                          │
                          Task 011 (최종 품질 검증) ───────┘
```

**핵심 의존성:**
- Task 007, 008은 Task 003 (Notion 클라이언트) 완료 후 진행
- Task 009는 Task 005 (UI 컴포넌트) + Task 008 (API) 모두 완료 후 진행
- Task 010은 Task 009 완료 후 + Notion 데이터베이스에 테스트 데이터 입력 필요
- Task 011은 모든 기능 구현 완료 후 진행

---

## 데이터 모델 선택 가이드

현재 `lib/notion/quote-mapper.ts`는 항목(items)을 외부에서 전달받는 구조로 설계되어 있습니다.
Task 007 진행 시 아래 옵션 중 하나를 선택하여 구현합니다.

| 항목 | 옵션 A (관계형 DB) | 옵션 B (블록 테이블) |
|------|-------------------|---------------------|
| Notion 설정 | 별도 Line Items DB + Relation 속성 | 페이지 본문에 테이블 블록 |
| API 호출 횟수 | 2회 (page + database.query) | 3회 (page + blocks.children.list + 파싱) |
| 타입 안전성 | 높음 (Number 속성 직접 사용) | 낮음 (Rich Text 파싱 필요) |
| 권장 상황 | 안정적 서비스 (MVP 권장) | 빠른 프로토타입 |

---

## 파일 구조 요약

```
app/
├── (public)/
│   ├── layout.tsx                     # 공개 페이지 레이아웃 (라이트 모드 강제)     [완료]
│   └── quote/[id]/page.tsx            # 견적서 공개 뷰 (Notion 연동 대기)          [Phase 4]
├── api/quotes/[id]/route.ts           # 견적서 조회 API (구현 대기)                [Phase 3]
├── layout.tsx                         # 루트 레이아웃                              [완료]
├── not-found.tsx                      # 404 페이지                                [완료]
└── globals.css                        # 전역 스타일 + 인쇄 CSS                    [완료]

components/
├── ui/                                # shadcn/ui 기본 컴포넌트                   [완료]
├── atoms/loading-spinner.tsx           # 로딩 스피너                               [완료]
├── molecules/pdf-download-button.tsx   # PDF 다운로드 버튼                         [완료]
└── organisms/
    ├── quote-view.tsx                 # 견적서 전체 뷰                             [완료]
    ├── quote-header.tsx               # 헤더 정보                                 [완료]
    ├── quote-items-table.tsx          # 항목 테이블                               [완료]
    ├── quote-summary.tsx              # 금액 요약                                 [완료]
    └── quote-error.tsx                # 오류 안내                                 [완료]

lib/
├── notion/
│   ├── client.ts                      # Notion SDK 클라이언트                     [완료]
│   └── quote-mapper.ts                # Notion 응답 -> Quote 변환                 [완료, 항목 조회 추가 필요]
├── validations/quote.ts               # Zod 검증 스키마                           [완료]
└── constants/quote.ts                 # 상수 (세율 등)                            [완료]

types/
└── quote.ts                           # Quote, QuoteItem 타입 정의               [완료]
```
