import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants/site";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

/**
 * 브랜드 로고 컴포넌트
 */
export function Logo({ className = "", variant = "default" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-bold text-lg transition-opacity hover:opacity-80",
        className
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white",
          variant === "light"
            ? "bg-gradient-to-br from-blue-400 to-blue-600"
            : "bg-gradient-to-br from-blue-500 to-blue-700"
        )}
      >
        C
      </div>
      <span
        className={cn(
          "hidden sm:inline",
          variant === "light"
            ? "text-gray-700 dark:text-gray-300"
            : "text-foreground"
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
