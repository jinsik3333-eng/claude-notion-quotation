import { PageHeader } from "@/components/molecules/page-header";
import { PageWrapper } from "@/components/templates/page-wrapper";
import { ContactForm } from "@/components/organisms/contact-form";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

/**
 * 문의 페이지
 */
export const metadata = {
  title: "문의 | Claude Next.js Starters",
  description: "저희에게 문의하세요",
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="문의하기"
        description="궁금한 점이 있으신가요? 아래 양식을 작성해주세요."
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "문의" },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {/* 문의 정보 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">연락처</h2>

          <div className="flex gap-4">
            <Mail className="h-5 w-5 mt-1 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">이메일</h3>
              <p className="text-sm text-muted-foreground">
                support@example.com
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Phone className="h-5 w-5 mt-1 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">전화</h3>
              <p className="text-sm text-muted-foreground">
                010-0000-0000
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <MapPin className="h-5 w-5 mt-1 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">주소</h3>
              <p className="text-sm text-muted-foreground">
                서울시 강남구
              </p>
            </div>
          </div>

          <Card className="p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground">
              일반적으로 24시간 이내에 답변드립니다.
            </p>
          </Card>
        </div>

        {/* 문의 폼 */}
        <div className="md:col-span-2">
          <Card className="p-6">
            <ContactForm />
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
