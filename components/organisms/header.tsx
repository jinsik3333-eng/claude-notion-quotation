"use client";

import { Logo } from "@/components/atoms/logo";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { UserMenu } from "@/components/molecules/user-menu";
import { NavItemComponent } from "@/components/molecules/nav-item";
import { MobileDrawer } from "./mobile-drawer";
import { mainNav } from "@/lib/constants/nav";

/**
 * 헤더 (Organism)
 *
 * - Logo + Navigation + ThemeToggle + UserMenu
 * - 모바일: 햄버거 메뉴 + Sheet (CSS 기반 반응형)
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Logo />

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex gap-1">
            {mainNav.map((item) => (
              <NavItemComponent key={item.href} item={item} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />

          {/* 모바일 네비게이션 */}
          <div className="md:hidden">
            <MobileDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
