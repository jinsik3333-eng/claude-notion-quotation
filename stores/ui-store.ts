import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * UI 전역 상태 (Zustand)
 *
 * - sidebar 열기/닫기
 */

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: "ui-store",
      // 기본값: SSR hydration 허용 (localStorage에서 자동 복원)
      skipHydration: false,
    }
  )
);
