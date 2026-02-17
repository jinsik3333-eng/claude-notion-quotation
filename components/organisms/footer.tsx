import Link from "next/link";
import { Logo } from "@/components/atoms/logo";
import { Separator } from "@/components/ui/separator";
import { footerNav, mainNav } from "@/lib/constants/nav";

/**
 * 푸터 (Organism)
 *
 * - Logo + 링크 + 저작권
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* 브랜드 소개 */}
          <div className="col-span-2 md:col-span-1">
            <Logo variant="light" />
            <p className="mt-2 text-sm text-muted-foreground">
              모던 Next.js 웹 스타터킷
            </p>
          </div>

          {/* 푸터 링크 그룹 */}
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.children?.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Claude Next.js Starters. 모든 권리 보유.
          </p>
          <div className="flex gap-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
