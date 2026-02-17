"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavItemComponent } from "@/components/molecules/nav-item";
import { UserMenu } from "@/components/molecules/user-menu";
import { dashboardNav } from "@/lib/constants/nav";
import { useUIStore } from "@/stores/ui-store";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * 대시보드 사이드바 (Organism)
 *
 * - 대시보드 네비게이션
 * - 접을 수 있는 상태 (Zustand)
 * - 모바일: 자동 접힘
 */
export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const isMobile = useIsMobile();

  // 모바일에서는 항상 접혀있음
  const isOpen = isMobile ? false : sidebarOpen;

  return (
    <aside
      className={`border-r bg-muted/30 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex h-full flex-col gap-4 p-4">
        {/* 사이드바 토글 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!isOpen)}
          className="self-end"
          title={isOpen ? "사이드바 접기" : "사이드바 펴기"}
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform ${
              !isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {/* 네비게이션 */}
        <nav className="flex flex-col gap-2 flex-1">
          {dashboardNav.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              className={!isOpen ? "justify-center" : ""}
            />
          ))}
        </nav>

        {/* 사용자 메뉴 */}
        {isOpen && <UserMenu />}
      </div>
    </aside>
  );
}
