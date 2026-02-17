import { PageHeader } from "@/components/molecules/page-header";
import { PageWrapper } from "@/components/templates/page-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * 설정 페이지
 */
export const metadata = {
  title: "설정 | Claude Next.js Starters",
  description: "사용자 설정",
};

export default function SettingsPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="설정"
        description="계정 및 애플리케이션 설정을 관리하세요"
        breadcrumbs={[
          { label: "대시보드", href: "/dashboard" },
          { label: "설정" },
        ]}
      />

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        {/* 사이드바 네비게이션 */}
        <nav className="space-y-1">
          {[
            { title: "프로필", href: "#profile" },
            { title: "보안", href: "#security" },
            { title: "알림", href: "#notifications" },
            { title: "외모", href: "#appearance" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* 설정 섹션 */}
        <div className="md:col-span-3 space-y-6">
          {/* 프로필 */}
          <Card id="profile">
            <CardHeader>
              <CardTitle>프로필</CardTitle>
              <CardDescription>
                프로필 정보를 관리하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                />
              </div>
              <Button>저장</Button>
            </CardContent>
          </Card>

          <Separator />

          {/* 보안 */}
          <Card id="security">
            <CardHeader>
              <CardTitle>보안</CardTitle>
              <CardDescription>
                계정 보안 설정을 관리하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">현재 비밀번호</Label>
                  <Input
                    id="current-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">새 비밀번호</Label>
                  <Input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">비밀번호 확인</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••"
                  />
                </div>
                <Button type="submit">비밀번호 변경</Button>
              </form>
            </CardContent>
          </Card>

          <Separator />

          {/* 알림 */}
          <Card id="notifications">
            <CardHeader>
              <CardTitle>알림</CardTitle>
              <CardDescription>
                알림 설정을 관리하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">이메일 알림</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">푸시 알림</Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS 알림</Label>
                <Switch id="sms-notifications" />
              </div>
              <Button>저장</Button>
            </CardContent>
          </Card>

          <Separator />

          {/* 외모 */}
          <Card id="appearance">
            <CardHeader>
              <CardTitle>외모</CardTitle>
              <CardDescription>
                애플리케이션 테마를 선택하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">테마</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">시스템 (기본값)</SelectItem>
                    <SelectItem value="light">라이트</SelectItem>
                    <SelectItem value="dark">다크</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>저장</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
