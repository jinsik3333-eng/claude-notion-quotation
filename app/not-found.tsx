import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * 404 Not Found 페이지
 */
export const metadata = {
  title: "페이지를 찾을 수 없습니다 | Claude Next.js Starters",
  description: "요청한 페이지가 존재하지 않습니다",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/30 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
        </div>

        <p className="text-muted-foreground">
          죄송합니다. 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">문의하기</Button>
          </Link>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            도움이 필요하신가요?{" "}
            <Link
              href="/contact"
              className="text-blue-600 hover:underline font-medium"
            >
              저희에게 문의하세요
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
