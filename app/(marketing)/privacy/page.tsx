import { PageHeader } from "@/components/molecules/page-header";
import { PageWrapper } from "@/components/templates/page-wrapper";

/**
 * 개인정보보호정책 페이지
 */
export const metadata = {
  title: "개인정보보호정책 | Claude Next.js Starters",
  description: "개인정보보호정책",
};

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="개인정보보호정책"
        description="귀사의 개인정보 보호 방침"
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "개인정보보호정책" },
        ]}
      />

      <div className="prose prose-sm dark:prose-invert max-w-none mt-12 space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">1. 개인정보 수집 항목</h2>
          <p className="text-muted-foreground">
            당 서비스는 다음과 같은 개인정보를 수집합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>이메일 주소</li>
            <li>이름</li>
            <li>서비스 이용 기록</li>
            <li>접속 IP 주소</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">2. 개인정보의 이용 목적</h2>
          <p className="text-muted-foreground">
            수집된 개인정보는 다음의 목적으로만 이용됩니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>서비스 제공</li>
            <li>회원 관리</li>
            <li>고객 상담 및 지원</li>
            <li>통계 및 분석</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">3. 개인정보 보호</h2>
          <p className="text-muted-foreground">
            당 회사는 개인정보의 안전성을 위해 다음의 조치를 취합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>암호화를 통한 정보 보호</li>
            <li>접근 권한 관리</li>
            <li>정기적인 보안 감시</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">4. 개인정보 제3자 공개</h2>
          <p className="text-muted-foreground">
            당 회사는 법적 요구가 있을 경우를 제외하고 개인정보를 제3자에게 공개하지 않습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">5. 개인정보 열람 및 수정</h2>
          <p className="text-muted-foreground">
            회원은 언제든지 당 회사에 개인정보의 열람 또는 수정을 요청할 수 있습니다.
            support@example.com으로 문의해주세요.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">6. 정책 변경</h2>
          <p className="text-muted-foreground">
            본 정책은 법률 변경 또는 서비스 개선에 따라 변경될 수 있으며,
            변경시 공지사항을 통해 안내됩니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">7. 문의</h2>
          <p className="text-muted-foreground">
            개인정보 보호 관련 문의는 support@example.com으로 연락주세요.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
}
