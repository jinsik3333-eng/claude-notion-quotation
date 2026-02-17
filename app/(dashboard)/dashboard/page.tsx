import { PageHeader } from "@/components/molecules/page-header";
import { PageWrapper } from "@/components/templates/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, Activity } from "lucide-react";

interface ActivityItem {
  time: string;
  action: string;
}

const recentActivities: ActivityItem[] = [
  { time: "2시간 전", action: "사용자가 로그인했습니다" },
  { time: "4시간 전", action: "새 항목이 생성되었습니다" },
  { time: "하루 전", action: "설정이 업데이트되었습니다" },
];

/**
 * 대시보드 페이지
 */
export const metadata = {
  title: "대시보드 | Claude Next.js Starters",
  description: "대시보드 페이지",
};

export default function DashboardPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="대시보드"
        description="환영합니다! 주요 통계를 확인하세요."
        breadcrumbs={[
          { label: "대시보드" },
        ]}
      />

      {/* 통계 카드 */}
      <div className="grid md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 방문자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">
              지난 달 대비 12% 증가
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 사용자</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">
              지난 시간 기준
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">매출</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              지난 달 대비 8% 증가
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전환율</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">
              안정적인 추세
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 상세 정보 */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((item) => (
              <div key={item.action} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.action}</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>빠른 시작</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>프로필 정보 완성하기</li>
              <li>API 키 설정하기</li>
              <li>팀원 초대하기</li>
              <li>첫 프로젝트 생성하기</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
