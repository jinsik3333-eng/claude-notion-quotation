"use client";

import { useState, useEffect } from "react";

/**
 * 디바운스 훅
 *
 * 지정된 딜레이 이후에 값을 업데이트합니다.
 *
 * @param value - 디바운스할 값
 * @param delay - 딜레이 (밀리초)
 * @returns 디바운스된 값
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce<string>(searchTerm, 300)
 *
 * useEffect(() => {
 *   // API 호출
 * }, [debouncedSearchTerm])
 *
 * 용도:
 * - 검색 입력 필터링
 * - 폼 자동 저장
 * - API 호출 최적화
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
