import { ReactNode } from "react";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";

/**
 * 기본 레이아웃 (Template)
 *
 * Header + main + Footer
 * 마케팅 페이지, 공개 페이지용
 */
export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
