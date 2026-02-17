# 노션 견적서 웹 공유 & PDF 다운로드 MVP PRD

> 작성일: 2026-02-17
> 버전: v1.0.0 (MVP)
> 작성자: 1인 개발자용

---

## 목차

1. [개요](#1-개요)
2. [사용자 스토리](#2-사용자-스토리)
3. [기능 요구사항](#3-기능-요구사항)
4. [비기능 요구사항](#4-비기능-요구사항)
5. [기술 아키텍처](#5-기술-아키텍처)
6. [UI/UX 시안](#6-uiux-시안)
7. [API 엔드포인트](#7-api-엔드포인트)
8. [데이터 모델](#8-데이터-모델)
9. [구현 계획](#9-구현-계획)
10. [성공 지표](#10-성공-지표)

---

## 1. 개요

### 1.1 프로젝트 목표

관리자가 Notion 데이터베이스에 입력한 견적서 데이터를 클라이언트가 별도 계정 없이 공개 링크로 웹 브라우저에서 확인하고 PDF로 다운로드할 수 있는 기능을 제공한다.

**핵심 가치:**
- 관리자: Notion에서 견적서를 작성하면 자동으로 공유 가능한 링크가 생성됨
- 클라이언트: 링크 하나만으로 전문적인 견적서를 확인하고 PDF로 저장 가능

### 1.2 비즈니스 임팩트

| 지표 | 현재 방식 | 개선 후 |
|------|----------|---------|
| 견적서 전달 방식 | Notion 링크 직접 공유 (비전문적) | 전문적인 웹 뷰 + PDF |
| 클라이언트 경험 | Notion UI 노출, 데이터 혼재 | 깔끔한 견적서 전용 UI |
| PDF 생성 | 수동 캡처 또는 별도 도구 | 원클릭 PDF 다운로드 |
| 추가 비용 | 없음 | 없음 (기존 Notion + Next.js 활용) |

### 1.3 범위 정의

**MVP 포함:**
- 공개 링크를 통한 견적서 조회 (인증 불필요)
- 웹 UI에서 전문적인 견적서 렌더링
- PDF 다운로드 (브라우저 print 또는 라이브러리)
- 기본 정보: 견적번호, 고객명, 금액, 항목, 유효기간

**MVP 제외 (v2+):**
- 디지털 서명
- 결제 기능
- 이메일 자동 발송
- 다국어 지원
- 권한 관리 (만료일 기반 접근 제어 등)

---

## 2. 사용자 스토리

### 2.1 관리자 관점

```
나는 프리랜서/소규모 사업자로서,
Notion에 견적서를 작성하면 자동으로 공유 링크가 생성되기를 원한다.
왜냐하면 별도 도구 없이 클라이언트에게 전문적인 견적서를 빠르게 전달하고 싶기 때문이다.
```

**세부 스토리:**
- 관리자로서, Notion 데이터베이스에 견적서 정보를 입력하면 고유 ID 기반 공유 URL이 자동 생성된다.
- 관리자로서, 생성된 URL을 클라이언트에게 복사해서 전달할 수 있다.
- 관리자로서, Notion에서 견적서를 수정하면 공유 URL의 내용도 즉시 반영된다.

### 2.2 클라이언트 관점

```
나는 서비스를 의뢰한 클라이언트로서,
받은 링크를 클릭해서 견적서를 바로 확인하고 PDF로 저장하고 싶다.
왜냐하면 계정 가입 없이 간편하게 견적 내용을 검토하고 기록으로 남기고 싶기 때문이다.
```

**세부 스토리:**
- 클라이언트로서, 받은 링크를 클릭하면 로그인 없이 견적서를 바로 볼 수 있다.
- 클라이언트로서, 견적서에서 항목별 금액, 합계, 유효기간을 명확하게 확인할 수 있다.
- 클라이언트로서, "PDF 다운로드" 버튼 한 번으로 견적서를 파일로 저장할 수 있다.
- 클라이언트로서, 존재하지 않거나 만료된 견적서 링크에 접근하면 명확한 안내 메시지를 본다.

---

## 3. 기능 요구사항

### 3.1 기능 목록 (ID 기준)

| ID | 기능명 | 설명 | 관련 화면 |
|----|--------|------|----------|
| F001 | 공개 견적서 조회 | 인증 없이 고유 ID로 견적서 데이터를 조회하여 렌더링 | 견적서 공개 뷰 페이지 |
| F002 | 견적서 항목 렌더링 | 항목명, 단가, 수량, 금액을 테이블 형태로 표시 | 견적서 공개 뷰 페이지 |
| F003 | 금액 합계 계산 및 표시 | 소계, 세금(10%), 총액을 자동 계산하여 표시 | 견적서 공개 뷰 페이지 |
| F004 | PDF 다운로드 | 브라우저 프린트 또는 라이브러리를 활용한 PDF 생성 및 다운로드 | 견적서 공개 뷰 페이지 |
| F005 | 오류 처리 | 존재하지 않는 견적서 ID 접근 시 404 안내 화면 표시 | 견적서 오류 페이지 |
| F006 | Notion API 데이터 조회 | Notion 데이터베이스에서 견적서 데이터를 서버에서 조회 | 서버 (API 라우트) |
| F007 | 견적서 헤더 정보 표시 | 견적번호, 발행일, 유효기간, 고객명, 발행자 정보 표시 | 견적서 공개 뷰 페이지 |

### 3.2 화면별 기능 상세

#### 3.2.1 견적서 공개 뷰 페이지 (`/quote/[id]`)

**역할:** 클라이언트가 링크를 통해 접근하는 핵심 화면. 견적서 전체 내용을 전문적으로 렌더링.

**구현 기능:** F001, F002, F003, F004, F007

**화면 구성:**
```
[견적서 헤더 영역]
- 회사/발행자 로고 (있을 경우)
- "견적서" 제목 텍스트
- 견적번호 (예: Q-2026-001)
- 발행일 / 유효기간

[고객 정보 영역]
- 고객명 (수신인)
- 고객 연락처 (Notion 데이터에 있을 경우)

[항목 테이블]
- 열: 번호 | 항목명 | 단가 | 수량 | 금액
- 각 행: Notion lineItems 데이터 반복 렌더링

[금액 요약 영역]
- 소계 (VAT 별도)
- 부가세 (10%)
- 총액 (굵게 강조)

[액션 영역]
- "PDF 다운로드" 버튼
- 발행자 연락처/서명 텍스트

[푸터]
- 유효기간 안내 텍스트
```

**사용자 행동 흐름:**
1. URL 접속 → 서버에서 Notion API 호출 → 데이터 없으면 F005 오류 페이지 이동
2. 데이터 있으면 견적서 렌더링 완료
3. "PDF 다운로드" 클릭 → 브라우저 프린트 다이얼로그 또는 라이브러리로 PDF 생성
4. PDF 파일명: `견적서_[견적번호]_[고객명].pdf`

#### 3.2.2 견적서 오류 페이지

**역할:** 존재하지 않는 ID 접근 시 클라이언트에게 명확한 안내 제공.

**구현 기능:** F005

**화면 구성:**
```
[중앙 정렬]
- 아이콘: FileX (lucide-react)
- 제목: "견적서를 찾을 수 없습니다"
- 설명: "링크가 만료되었거나 올바르지 않은 견적서 주소입니다. 담당자에게 문의해 주세요."
- 버튼: 없음 (공개 페이지이므로 홈으로 이동 불필요)
```

---

## 4. 비기능 요구사항

### 4.1 성능

| 항목 | 목표값 | 측정 방법 |
|------|--------|----------|
| 견적서 페이지 초기 로딩 | 2초 이내 (Notion API 응답 포함) | Lighthouse, 브라우저 DevTools |
| PDF 생성 시간 | 3초 이내 | 수동 측정 |
| Notion API 응답 | 1초 이내 (정상 상태) | Vercel 함수 로그 |

**전략:**
- Next.js 16 App Router의 서버 컴포넌트(RSC)로 서버에서 데이터 조회 후 렌더링
- `revalidate` 설정으로 Notion API 응답 캐싱 (60초 권장)
- PDF는 클라이언트에서 생성하여 서버 부하 없음

### 4.2 보안

| 항목 | 요구사항 |
|------|----------|
| Notion API 키 | 환경변수(`NOTION_API_KEY`)로 관리, 클라이언트에 노출 금지 |
| 견적서 ID | Notion 페이지 UUID 사용 (예측 불가능한 32자 문자열) |
| 공개 접근 | 인증 없이 접근 가능하므로 ID 유추 불가능한 UUID 사용 |
| 환경변수 | `.env.local`에 보관, `.gitignore`에 반드시 포함 |

**참고:** MVP에서 URL 기반 접근 제어는 Notion UUID의 예측 불가능성에 의존한다. 추가 보안이 필요하면 v2에서 만료일 기반 접근 제어를 구현한다.

### 4.3 호환성

| 항목 | 지원 범위 |
|------|----------|
| 브라우저 | Chrome 90+, Firefox 90+, Safari 14+, Edge 90+ |
| 모바일 | iOS Safari, Android Chrome (반응형 레이아웃) |
| PDF | 브라우저 내장 프린트 (모든 현대 브라우저 지원) |
| 화면 크기 | 320px ~ 1440px (모바일 우선 반응형) |

### 4.4 접근성

- `alt` 속성 필수 (이미지 사용 시)
- 색상 대비 WCAG AA 기준 준수
- 키보드 내비게이션 지원 (PDF 버튼 포함)

---

## 5. 기술 아키텍처

### 5.1 신규 파일 및 컴포넌트 구조

```
app/
└── (public)/                          # 공개 접근 라우트 그룹 (신규)
    └── quote/
        └── [id]/
            └── page.tsx               # 견적서 공개 뷰 페이지 (서버 컴포넌트)

app/
└── api/
    └── quotes/
        └── [id]/
            └── route.ts              # 견적서 단건 조회 API (신규)

components/
├── organisms/
│   ├── quote-view.tsx               # 견적서 전체 렌더링 컴포넌트 (신규)
│   ├── quote-header.tsx             # 견적서 헤더 (견적번호, 날짜, 고객정보) (신규)
│   ├── quote-items-table.tsx        # 견적 항목 테이블 (신규)
│   ├── quote-summary.tsx            # 소계/세금/총액 요약 (신규)
│   └── quote-error.tsx             # 오류 안내 컴포넌트 (신규)
├── molecules/
│   └── pdf-download-button.tsx      # PDF 다운로드 버튼 (클라이언트 컴포넌트) (신규)

lib/
├── notion/
│   ├── client.ts                    # Notion SDK 클라이언트 초기화 (신규)
│   └── quote-mapper.ts             # Notion 응답 → Quote 타입 변환 (신규)
├── validations/
│   └── quote.ts                    # 견적서 Zod 스키마 (신규)
└── constants/
    └── quote.ts                    # 견적서 관련 상수 (세율 등) (신규)

types/
└── quote.ts                        # Quote, QuoteItem 타입 정의 (신규)
```

### 5.2 데이터 흐름

```
클라이언트 브라우저
    │
    │ GET /quote/[id]
    ▼
Next.js 서버 (app/(public)/quote/[id]/page.tsx)
    │
    │ Notion API 호출 (서버에서만 실행)
    ▼
Notion API (pages.retrieve + blocks.children.list)
    │
    │ 응답 데이터
    ▼
lib/notion/quote-mapper.ts (Notion 응답 → Quote 타입 변환)
    │
    │ Quote 타입 데이터
    ▼
components/organisms/quote-view.tsx (서버 렌더링)
    │
    │ 완성된 HTML
    ▼
클라이언트 브라우저 (하이드레이션)
    │
    │ "PDF 다운로드" 클릭
    ▼
molecules/pdf-download-button.tsx (클라이언트 컴포넌트)
    │
    │ window.print() 또는 PDF 라이브러리
    ▼
PDF 파일 저장
```

### 5.3 환경변수

```bash
# .env.local
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_QUOTE_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5.4 주요 의존성

| 패키지 | 용도 | 설치 여부 |
|--------|------|----------|
| `@notionhq/client` | Notion API SDK | 신규 설치 필요 |
| `lucide-react` | 아이콘 (FileX, Download 등) | 기존 설치됨 |
| `tailwindcss` | 스타일링 | 기존 설치됨 |
| `shadcn/ui` | UI 컴포넌트 (Table, Badge, Button) | 기존 설치됨 |
| `@react-pdf/renderer` | PDF 생성 (선택, 브라우저 print 대안) | 선택적 설치 |

**PDF 구현 방식 선택:**

| 방식 | 장점 | 단점 | 권장 |
|------|------|------|------|
| `window.print()` + print CSS | 추가 설치 없음, 간단 | 브라우저 UI 노출, 스타일 제한 | MVP 1순위 |
| `@react-pdf/renderer` | 완벽한 PDF 제어, 스타일 자유 | 번들 크기 증가, 학습 필요 | MVP 2순위 |
| `html2canvas` + `jspdf` | DOM 기반, 쉬운 적용 | 한글 폰트 처리 복잡 | 비권장 |

---

## 6. UI/UX 시안

### 6.1 견적서 공개 뷰 페이지 레이아웃

```
┌─────────────────────────────────────────────────┐
│  [헤더 없음 - 공개 페이지]                        │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │           COMPANY LOGO (선택)            │   │
│  │                                         │   │
│  │  견 적 서                    Q-2026-001 │   │
│  │                                         │   │
│  │  수신: 홍길동 고객사                     │   │
│  │  발행일: 2026-02-17                     │   │
│  │  유효기간: 2026-03-17                   │   │
│  ├─────────────────────────────────────────┤   │
│  │ No │  항목명  │  단가  │ 수량 │   금액  │   │
│  ├────┼─────────┼────────┼──────┼─────────┤   │
│  │  1 │ 웹 개발  │500,000│  3   │1,500,000│   │
│  │  2 │ 디자인   │300,000│  2   │  600,000│   │
│  ├─────────────────────────────────────────┤   │
│  │                        소계  2,100,000  │   │
│  │                        부가세  210,000  │   │
│  │                ────────────────────────│   │
│  │                        합계  2,310,000  │   │
│  ├─────────────────────────────────────────┤   │
│  │         [PDF 다운로드] 버튼              │   │
│  ├─────────────────────────────────────────┤   │
│  │  발행자: 홍길동 | 연락처: 010-1234-5678  │   │
│  │  * 본 견적서의 유효기간은 발행일로부터    │   │
│  │    30일입니다.                          │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### 6.2 오류 페이지 레이아웃

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              [FileX 아이콘, 48px]               │
│                                                 │
│          견적서를 찾을 수 없습니다              │
│                                                 │
│    링크가 만료되었거나 올바르지 않은 견적서      │
│    주소입니다. 담당자에게 문의해 주세요.         │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 6.3 인쇄/PDF 스타일 규칙

```css
/* 인쇄 시 숨길 요소 */
@media print {
  .pdf-download-button { display: none; }
  .page-header { display: none; }
  .page-footer { display: none; }
}

/* 인쇄 시 강제 적용 */
@media print {
  body { -webkit-print-color-adjust: exact; }
  .quote-container { box-shadow: none; border: 1px solid #e5e7eb; }
  page { size: A4; margin: 20mm; }
}
```

### 6.4 반응형 레이아웃

| 화면 크기 | 레이아웃 |
|----------|---------|
| 모바일 (< 768px) | 전체 너비, 항목 테이블 가로 스크롤 허용 |
| 태블릿 (768px ~ 1024px) | 최대 너비 720px, 중앙 정렬 |
| 데스크톱 (> 1024px) | 최대 너비 800px, 중앙 정렬, 그림자 효과 |

---

## 7. API 엔드포인트

### 7.1 신규 API 라우트

#### `GET /api/quotes/[id]`

Notion 데이터베이스에서 특정 견적서를 조회하여 반환한다.

**요청:**
```http
GET /api/quotes/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**응답 (성공 200):**
```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "quoteNumber": "Q-2026-001",
  "title": "웹사이트 개발 견적서",
  "clientName": "홍길동",
  "clientCompany": "홍길동 주식회사",
  "issueDate": "2026-02-17",
  "validUntil": "2026-03-17",
  "status": "sent",
  "items": [
    {
      "id": "item-1",
      "name": "웹 개발",
      "unitPrice": 500000,
      "quantity": 3,
      "amount": 1500000
    },
    {
      "id": "item-2",
      "name": "디자인",
      "unitPrice": 300000,
      "quantity": 2,
      "amount": 600000
    }
  ],
  "subtotal": 2100000,
  "taxRate": 0.1,
  "taxAmount": 210000,
  "totalAmount": 2310000,
  "notes": "본 견적서의 유효기간은 발행일로부터 30일입니다.",
  "issuerName": "홍길동",
  "issuerContact": "010-1234-5678"
}
```

**응답 (실패 404):**
```json
{
  "error": "NOT_FOUND",
  "message": "견적서를 찾을 수 없습니다."
}
```

**응답 (서버 오류 500):**
```json
{
  "error": "INTERNAL_ERROR",
  "message": "데이터 조회 중 오류가 발생했습니다."
}
```

**참고:** 공개 뷰 페이지(`/quote/[id]`)는 서버 컴포넌트에서 Notion API를 직접 호출하므로, 이 API 라우트는 선택적으로 구현한다. 클라이언트 측 PDF 라이브러리가 데이터를 필요로 하는 경우 활용 가능하다.

---

## 8. 데이터 모델

### 8.1 Notion 데이터베이스 스키마

Notion 데이터베이스에 다음 속성(Property)이 필요하다.

#### 견적서 데이터베이스 (Quote Database)

| 필드명 | Notion 속성 타입 | 설명 | 예시 |
|--------|-----------------|------|------|
| `Name` | Title | 견적서 제목 (자동 키) | 웹사이트 개발 견적서 |
| `quoteNumber` | Rich Text | 견적 번호 | Q-2026-001 |
| `clientName` | Rich Text | 고객 이름 | 홍길동 |
| `clientCompany` | Rich Text | 고객 회사명 | 홍길동 주식회사 |
| `issueDate` | Date | 발행일 | 2026-02-17 |
| `validUntil` | Date | 유효기간 | 2026-03-17 |
| `status` | Select | 견적서 상태 | draft / sent / accepted / rejected |
| `taxRate` | Number | 세율 (기본 0.1) | 0.1 |
| `notes` | Rich Text | 비고/안내사항 | 유효기간은 30일입니다 |
| `issuerName` | Rich Text | 발행자 이름 | 홍길동 |
| `issuerContact` | Rich Text | 발행자 연락처 | 010-1234-5678 |

#### 견적 항목 (Line Items) - Notion 하위 데이터베이스 또는 블록

**옵션 A: 별도 데이터베이스 (권장)**

| 필드명 | Notion 속성 타입 | 설명 | 예시 |
|--------|-----------------|------|------|
| `Name` | Title | 항목명 | 웹 개발 |
| `quoteId` | Relation | 견적서 ID (상위 DB 연결) | [관계 속성] |
| `unitPrice` | Number | 단가 | 500000 |
| `quantity` | Number | 수량 | 3 |
| `amount` | Formula | 금액 (단가 × 수량) | `prop("unitPrice") * prop("quantity")` |
| `order` | Number | 항목 순서 | 1 |

**옵션 B: 견적서 본문 블록 (간단한 구현)**

견적서 Notion 페이지 본문에 테이블 블록으로 항목을 입력하고, Notion Blocks API로 조회한다.

```
| 항목명   | 단가    | 수량 | 금액      |
|---------|---------|------|----------|
| 웹 개발  | 500,000 | 3   | 1,500,000|
| 디자인   | 300,000 | 2   |   600,000|
```

**MVP 권장:** 옵션 B (블록 테이블)로 시작하여 구현 복잡도를 낮춘다.

### 8.2 TypeScript 타입 정의

```typescript
// types/quote.ts

export interface QuoteItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  order: number;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  title: string;
  clientName: string;
  clientCompany?: string;
  issueDate: string;      // ISO 날짜 문자열 (YYYY-MM-DD)
  validUntil: string;     // ISO 날짜 문자열 (YYYY-MM-DD)
  status: "draft" | "sent" | "accepted" | "rejected";
  items: QuoteItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
  issuerName: string;
  issuerContact?: string;
}

export type QuoteStatus = Quote["status"];
```

### 8.3 Zod 검증 스키마

```typescript
// lib/validations/quote.ts
import { z } from "zod";

export const quoteItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  unitPrice: z.number().nonnegative(),
  quantity: z.number().positive(),
  amount: z.number().nonnegative(),
  order: z.number().int().nonnegative(),
});

export const quoteSchema = z.object({
  id: z.string().uuid(),
  quoteNumber: z.string().min(1),
  title: z.string().min(1),
  clientName: z.string().min(1),
  clientCompany: z.string().optional(),
  issueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  validUntil: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(["draft", "sent", "accepted", "rejected"]),
  items: z.array(quoteItemSchema),
  subtotal: z.number().nonnegative(),
  taxRate: z.number().min(0).max(1),
  taxAmount: z.number().nonnegative(),
  totalAmount: z.number().nonnegative(),
  notes: z.string().optional(),
  issuerName: z.string().min(1),
  issuerContact: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
```

---

## 9. 구현 계획

### 9.1 작업 순서 (단계별)

#### Phase 1: 기반 설정 (예상 소요: 1일)

1. **환경변수 설정**
   - `.env.local`에 `NOTION_API_KEY`, `NOTION_QUOTE_DATABASE_ID` 추가
   - `.env.example` 파일 생성 (값 없이 키만)

2. **Notion SDK 설치 및 클라이언트 초기화**
   ```bash
   npm install @notionhq/client
   ```
   - `lib/notion/client.ts` 생성

3. **타입 정의**
   - `types/quote.ts` 생성 (Quote, QuoteItem 인터페이스)
   - `lib/validations/quote.ts` 생성 (Zod 스키마)

4. **Notion 데이터베이스 스키마 설정**
   - Notion에서 견적서 데이터베이스 속성 추가/확인
   - 테스트용 견적서 데이터 1~2건 입력

#### Phase 2: 데이터 조회 레이어 (예상 소요: 1일)

5. **Notion 데이터 변환 함수 구현**
   - `lib/notion/quote-mapper.ts` 생성
   - Notion API 응답 → Quote 타입 변환 함수 구현
   - 항목 데이터 파싱 (블록 테이블 또는 관계형 DB)

6. **API 라우트 구현 (선택)**
   - `app/api/quotes/[id]/route.ts` 생성
   - GET 핸들러: Notion API 호출 → Quote 반환
   - 오류 처리: 404, 500

7. **데이터 조회 테스트**
   - 브라우저에서 `/api/quotes/[실제ID]` 접근하여 응답 확인

#### Phase 3: UI 컴포넌트 구현 (예상 소요: 2일)

8. **견적서 오류 컴포넌트**
   - `components/organisms/quote-error.tsx` 생성

9. **견적서 헤더 컴포넌트**
   - `components/organisms/quote-header.tsx` 생성
   - 견적번호, 날짜, 고객정보 표시

10. **견적 항목 테이블 컴포넌트**
    - `components/organisms/quote-items-table.tsx` 생성
    - shadcn/ui Table 컴포넌트 활용
    - 금액 천단위 콤마 포맷팅

11. **금액 요약 컴포넌트**
    - `components/organisms/quote-summary.tsx` 생성
    - 소계, 세금, 총액 계산 및 표시

12. **PDF 다운로드 버튼 컴포넌트**
    - `components/molecules/pdf-download-button.tsx` 생성
    - `"use client"` 지시어 필수
    - `window.print()` 또는 PDF 라이브러리 연결

13. **견적서 뷰 통합 컴포넌트**
    - `components/organisms/quote-view.tsx` 생성
    - 위 컴포넌트들 조합

#### Phase 4: 페이지 및 스타일링 (예상 소요: 1일)

14. **공개 라우트 그룹 생성**
    - `app/(public)/quote/[id]/page.tsx` 생성
    - 서버 컴포넌트로 Notion API 직접 호출
    - 동적 메타데이터 (`generateMetadata`) 설정

15. **인쇄 CSS 스타일 추가**
    - `app/globals.css`에 `@media print` 스타일 추가
    - PDF 다운로드 버튼 인쇄 시 숨김 처리
    - A4 페이지 레이아웃 설정

#### Phase 5: 테스트 및 마무리 (예상 소요: 0.5일)

16. **통합 테스트**
    - 실제 Notion 데이터로 견적서 페이지 렌더링 확인
    - PDF 다운로드 동작 확인 (Chrome, Firefox, Safari)
    - 모바일 반응형 확인
    - 존재하지 않는 ID 접근 시 오류 페이지 확인

17. **최종 정리**
    - 불필요한 console.log 제거
    - 타입 오류 확인 (`npx tsc --noEmit`)
    - ESLint 통과 확인 (`npm run lint`)

---

## 10. 성공 지표

### 10.1 기능 검증 체크리스트

#### F001 - 공개 견적서 조회

- [ ] `/quote/[실제-노션-페이지-ID]` 접속 시 견적서가 정상 렌더링된다
- [ ] Notion API 키 없이는 데이터가 노출되지 않는다 (서버 전용)
- [ ] 존재하지 않는 ID 접속 시 404 오류 페이지가 표시된다
- [ ] 로그인 없이 URL만으로 접근 가능하다

#### F002 - 견적서 항목 렌더링

- [ ] 모든 항목(이름, 단가, 수량, 금액)이 테이블에 정확히 표시된다
- [ ] 금액에 천단위 콤마가 적용된다 (예: 1,500,000)
- [ ] 항목이 0개일 때 빈 테이블이 아닌 안내 메시지가 표시된다

#### F003 - 금액 합계 계산

- [ ] 소계 = 모든 항목 금액의 합이다
- [ ] 부가세 = 소계 × 세율이다
- [ ] 총액 = 소계 + 부가세이다
- [ ] 계산 결과가 Notion 데이터와 일치한다

#### F004 - PDF 다운로드

- [ ] "PDF 다운로드" 버튼 클릭 시 브라우저 프린트 다이얼로그가 열린다
- [ ] 프린트 미리보기에서 견적서 레이아웃이 A4 기준으로 정렬된다
- [ ] 프린트 미리보기에서 "PDF 다운로드" 버튼이 보이지 않는다
- [ ] PDF 저장 시 견적서 전체 내용이 포함된다

#### F005 - 오류 처리

- [ ] 잘못된 ID 접근 시 적절한 오류 메시지가 표시된다
- [ ] 오류 페이지에서 불필요한 내비게이션이 노출되지 않는다

#### F007 - 헤더 정보 표시

- [ ] 견적번호, 발행일, 유효기간이 정확히 표시된다
- [ ] 고객명이 표시된다
- [ ] 유효기간이 지난 경우 시각적으로 구분된다 (선택 사항)

### 10.2 비기능 검증

| 항목 | 검증 방법 | 통과 기준 |
|------|----------|----------|
| 페이지 로딩 속도 | Chrome DevTools Network 탭 | DOMContentLoaded 2초 이내 |
| 모바일 레이아웃 | Chrome DevTools 모바일 시뮬레이터 | 320px에서 가로 스크롤 없음 |
| TypeScript 오류 | `npx tsc --noEmit` | 오류 0개 |
| ESLint | `npm run lint` | 경고/오류 0개 |
| API 키 노출 | 브라우저 소스 코드 검사 | NOTION_API_KEY 문자열 없음 |

### 10.3 사용자 시나리오 테스트

**시나리오 1: 정상 플로우**
1. Notion에서 견적서 작성 완료
2. Notion 페이지 ID 복사
3. `https://[도메인]/quote/[ID]` URL 생성
4. 해당 URL을 새 시크릿 창에서 접속
5. 견적서가 정상 렌더링 되는지 확인
6. "PDF 다운로드" 버튼 클릭 → PDF 파일 저장 확인

**시나리오 2: 오류 플로우**
1. 임의의 UUID를 URL에 입력 (`/quote/00000000-0000-0000-0000-000000000000`)
2. 오류 안내 페이지가 표시되는지 확인
3. 페이지에 불필요한 정보(API 키, 스택 트레이스)가 노출되지 않는지 확인

---

*이 PRD는 MVP 구현을 위한 최소 명세입니다. v2 기능(디지털 서명, 결제, 이메일 발송)은 MVP 검증 후 별도 PRD로 작성합니다.*
