import { DashboardLayout } from "@/components/templates/dashboard-layout";

/**
 * 대시보드 라우트 그룹 레이아웃
 *
 * DashboardLayout 적용 (Sidebar + Header + main)
 */
export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
