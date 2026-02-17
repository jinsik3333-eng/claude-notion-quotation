import { DefaultLayout } from "@/components/templates/default-layout";

/**
 * 마케팅 라우트 그룹 레이아웃
 *
 * DefaultLayout 적용 (Header + main + Footer)
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
