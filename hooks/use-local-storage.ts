"use client";

export { useLocalStorage } from "usehooks-ts";

/**
 * usehooks-ts의 useLocalStorage 훅을 직접 사용
 *
 * useLocalStorage<T>(key, initialValue, options?)
 *
 * @example
 * const [value, setValue] = useLocalStorage<string>('theme', 'light')
 *
 * 특징:
 * - SSR 안전 (초기값이 클라이언트에서만 설정)
 * - StorageEvent 기반 탭 간 동기화
 * - TypeScript 제네릭 지원
 */
