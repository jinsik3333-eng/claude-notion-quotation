import { PageHeader } from "@/components/molecules/page-header";
import { PageWrapper } from "@/components/templates/page-wrapper";

/**
 * 이용약관 페이지
 */
export const metadata = {
  title: "이용약관 | Claude Next.js Starters",
  description: "서비스 이용약관",
};

export default function TermsPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="이용약관"
        description="당 서비스의 이용약관입니다"
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "이용약관" },
        ]}
      />

      <div className="prose prose-sm dark:prose-invert max-w-none mt-12 space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">제1조 서비스의 이용</h2>
          <p className="text-muted-foreground">
            1. 본 서비스는 회원의 신청에 따라 이용이 가능합니다.
          </p>
          <p className="text-muted-foreground">
            2. 회원은 본 약관에 동의함으로써 서비스 이용 계약이 성립됩니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">제2조 이용 금지 행위</h2>
          <p className="text-muted-foreground">
            회원은 다음과 같은 행위를 하지 않기로 동의합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>다른 사용자의 개인정보 도용</li>
            <li>불법적인 컨텐츠 배포</li>
            <li>서비스 시스템 해킹 또는 공격</li>
            <li>욕설 및 비방</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">제3조 서비스의 변경 및 중단</h2>
          <p className="text-muted-foreground">
            1. 당 회사는 운영상 필요에 따라 서비스를 변경할 수 있습니다.
          </p>
          <p className="text-muted-foreground">
            2. 당 회사는 사전 공지를 통해 서비스 중단을 알립니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">제4조 회원의 책임</h2>
          <p className="text-muted-foreground">
            1. 회원은 본인의 계정 정보 관리에 책임을 가집니다.
          </p>
          <p className="text-muted-foreground">
            2. 회원의 부주의로 인한 손실은 당 회사가 책임지지 않습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">제5조 지적재산권</h2>
          <p className="text-muted-foreground">
            당 서비스의 모든 콘텐츠는 저작권법에 의해 보호되며,
            회원은 개인 용도로만 이용할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">제6조 서비스 이용료</h2>
          <p className="text-muted-foreground">
            본 서비스는 현재 무료입니다. 향후 유료 서비스가 추가될 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">제7조 약관의 변경</h2>
          <p className="text-muted-foreground">
            당 회사는 필요시 약관을 변경할 수 있으며, 변경사항은 사전에 공지합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">제8조 문의</h2>
          <p className="text-muted-foreground">
            약관 관련 문의는 support@example.com으로 연락주세요.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
}
