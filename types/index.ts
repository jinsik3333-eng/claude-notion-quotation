/**
 * 전역 타입 정의
 */

import type { ComponentType } from "react";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
  isActive?: boolean;
  children?: NavItem[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
