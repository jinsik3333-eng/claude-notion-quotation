"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavItemComponent } from "@/components/molecules/nav-item";
import { mainNav } from "@/lib/constants/nav";

/**
 * 모바일 네비게이션 드로어 (Organism)
 *
 * - Sheet 기반 사이드 네비게이션
 * - 모바일 환경에서만 표시
 */
export function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-4">
        <nav className="flex flex-col gap-2">
          {mainNav.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              className="w-full justify-start"
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
