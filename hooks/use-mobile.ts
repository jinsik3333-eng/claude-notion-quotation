"use client";

import { useMediaQuery } from "usehooks-ts";

/**
 * 모바일 브레이크포인트 감지 (< 768px)
 *
 * @returns boolean - 모바일 환경 여부
 */
export function useIsMobile(): boolean {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return isMobile;
}

/**
 * 태블릿 브레이크포인트 감지 (768px ~ 1023px)
 *
 * @returns boolean - 태블릿 환경 여부
 */
export function useIsTablet(): boolean {
  const isTablet = useMediaQuery(
    "(min-width: 768px) and (max-width: 1023px)"
  );
  return isTablet;
}

/**
 * 데스크톱 브레이크포인트 감지 (>= 1024px)
 *
 * @returns boolean - 데스크톱 환경 여부
 */
export function useIsDesktop(): boolean {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return isDesktop;
}
