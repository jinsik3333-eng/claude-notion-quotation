/**
 * 견적서 관련 상수
 */

// 기본 세율 (10%)
export const DEFAULT_TAX_RATE = 0.1;

// 견적서 상태 레이블
export const QUOTE_STATUS_LABELS = {
  draft: "임시저장",
  sent: "발송됨",
  accepted: "수락됨",
  rejected: "거절됨",
} as const;

// Notion API 응답 캐시 유효 시간 (초)
export const QUOTE_CACHE_REVALIDATE_SECONDS = 60;
