import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { NavItem } from "@/types";

interface NavItemComponentProps {
  item: NavItem;
  className?: string;
}

/**
 * 네비게이션 아이템 (Molecule)
 *
 * - 링크 + 아이콘 + 배지
 */
export function NavItemComponent({
  item,
  className = "",
}: NavItemComponentProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        item.isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground",
        className
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{item.title}</span>
      {item.isActive && (
        <Badge variant="default" className="ml-auto">
          활성
        </Badge>
      )}
    </Link>
  );
}
