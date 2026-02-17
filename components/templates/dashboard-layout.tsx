import { ReactNode } from "react";
import { Header } from "@/components/organisms/header";
import { Sidebar } from "@/components/organisms/sidebar";

/**
 * 대시보드 레이아웃 (Template)
 *
 * Sidebar + Header + main
 * 대시보드, 설정 페이지용
 */
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
