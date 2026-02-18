import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { QuoteItem } from "@/types/quote";

interface QuoteItemsTableProps {
  items: QuoteItem[];
}

/**
 * 견적 항목 테이블 컴포넌트
 * - 항목명, 단가, 수량, 금액을 테이블 형태로 표시
 * - 금액은 천단위 콤마 포맷 적용
 */
export function QuoteItemsTable({ items }: QuoteItemsTableProps) {
  const formatKRW = (amount: number) =>
    amount.toLocaleString("ko-KR");

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground border rounded-md">
        등록된 견적 항목이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">No</TableHead>
            <TableHead>항목명</TableHead>
            <TableHead className="text-right">단가</TableHead>
            <TableHead className="text-center w-16">수량</TableHead>
            <TableHead className="text-right">금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">
                {formatKRW(item.unitPrice)}
              </TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right font-medium">
                {formatKRW(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
