import type { SiteConfig } from "@/types";

/**
 * 사이트 기본 설정 상수
 */
export const siteConfig: SiteConfig = {
  name: "invoice-web",
  description: "Notion 견적서 웹 공유 & PDF 다운로드 서비스",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};
