import {
  Home,
  Settings,
  BarChart3,
  FileText,
  HelpCircle,
  Mail,
} from "lucide-react";
import type { NavItem } from "@/types";

/**
 * 메인 네비게이션 항목
 */
export const mainNav: NavItem[] = [
  {
    title: "홈",
    href: "/",
    description: "홈페이지",
    icon: Home,
  },
  {
    title: "정보",
    href: "/about",
    description: "스타터킷 정보",
  },
  {
    title: "문의",
    href: "/contact",
    description: "연락 양식",
    icon: Mail,
  },
];

/**
 * 대시보드 사이드바 네비게이션
 */
export const dashboardNav: NavItem[] = [
  {
    title: "대시보드",
    href: "/dashboard",
    description: "대시보드",
    icon: BarChart3,
  },
  {
    title: "설정",
    href: "/dashboard/settings",
    description: "사용자 설정",
    icon: Settings,
  },
];

/**
 * 푸터 링크
 */
export const footerNav: NavItem[] = [
  {
    title: "정책",
    href: "#",
    children: [
      {
        title: "개인정보보호정책",
        href: "/privacy",
      },
      {
        title: "이용약관",
        href: "/terms",
      },
    ],
  },
  {
    title: "지원",
    href: "#",
    children: [
      {
        title: "문서",
        href: "/docs",
      },
      {
        title: "FAQ",
        href: "/faq",
      },
    ],
  },
];
