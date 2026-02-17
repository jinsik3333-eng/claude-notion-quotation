import { PageHeader } from "@/components/molecules/page-header";
import { PageWrapper } from "@/components/templates/page-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ 페이지
 */
export const metadata = {
  title: "FAQ | Claude Next.js Starters",
  description: "자주 묻는 질문",
};

const faqs = [
  {
    id: "what-is-starter",
    question: "이 스타터킷은 무엇인가요?",
    answer:
      "Claude Next.js Starters는 모던 웹 개발을 위한 완벽한 기초를 제공하는 스타터킷입니다. Next.js 16, React 19, TypeScript, Tailwind CSS 등 최신 기술 스택을 포함하고 있습니다.",
  },
  {
    id: "how-to-start",
    question: "어떻게 시작하나요?",
    answer:
      "프로젝트를 클론한 후 npm install로 의존성을 설치하고, npm run dev로 개발 서버를 실행하세요. http://localhost:3000에서 확인할 수 있습니다.",
  },
  {
    id: "tech-stack",
    question: "어떤 기술 스택을 사용하나요?",
    answer:
      "Next.js 16.1.6, React 19.2.3, TypeScript, Tailwind CSS 4, shadcn/ui, React Hook Form, Zod, Zustand, next-themes, Sonner 등을 사용합니다.",
  },
  {
    id: "add-component",
    question: "컴포넌트를 추가하려면 어떻게 하나요?",
    answer:
      "새로운 shadcn 컴포넌트를 추가하려면 npx shadcn@latest add [component-name]을 실행하세요. Atomic Design 패턴에 따라 components 폴더 구조를 유지합니다.",
  },
  {
    id: "dark-mode",
    question: "다크모드가 지원되나요?",
    answer:
      "네, next-themes를 사용하여 완벽한 다크모드를 지원합니다. 헤더의 토글 버튼으로 테마를 전환할 수 있으며, 시스템 설정을 자동으로 인식합니다.",
  },
  {
    id: "form-validation",
    question: "폼 검증은 어떻게 하나요?",
    answer:
      "React Hook Form과 Zod를 함께 사용합니다. lib/validations에 스키마를 정의하고, RHF의 useForm 훅과 zodResolver를 사용하여 폼을 관리합니다.",
  },
  {
    id: "state-management",
    question: "전역 상태 관리는 어떻게 하나요?",
    answer:
      "Zustand를 사용합니다. stores 폴더에 상태를 정의하고, 필요한 컴포넌트에서 훅으로 불러와 사용합니다. 매우 경량이고 간단합니다.",
  },
  {
    id: "responsive-design",
    question: "반응형 디자인이 적용되나요?",
    answer:
      "네, 모든 페이지가 모바일 우선 반응형 디자인으로 작성되어 있습니다. Tailwind CSS의 반응형 클래스와 useMediaQuery 훅을 사용합니다.",
  },
  {
    id: "api-routes",
    question: "API 라우트를 추가할 수 있나요?",
    answer:
      "네, app/api 폴더에 API 라우트를 추가할 수 있습니다. Next.js App Router의 API Routes 기능을 사용하면 됩니다.",
  },
  {
    id: "production-build",
    question: "프로덕션 빌드는 어떻게 하나요?",
    answer:
      "npm run build를 실행하여 최적화된 프로덕션 빌드를 생성합니다. 이후 npm run start로 프로덕션 서버를 실행할 수 있습니다.",
  },
];

export default function FAQPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="자주 묻는 질문"
        description="스타터킷 사용에 대한 일반적인 질문과 답변"
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "FAQ" },
        ]}
      />

      <div className="mt-12 max-w-2xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-16 p-6 bg-muted rounded-lg text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          찾는 답이 없으신가요?
        </p>
        <p className="text-sm font-medium">
          <a href="/contact" className="text-blue-600 hover:underline">
            문의 양식
          </a>
          을 통해 연락주세요.
        </p>
      </div>
    </PageWrapper>
  );
}
