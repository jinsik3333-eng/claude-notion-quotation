import { z } from "zod";

/**
 * 견적서 Zod 검증 스키마
 * Notion API 응답 데이터의 런타임 안전성 보장
 */

export const quoteItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  unitPrice: z.number().nonnegative(),
  quantity: z.number().positive(),
  amount: z.number().nonnegative(),
  order: z.number().int().nonnegative(),
});

/**
 * Notion ID 검증
 * - 32자 형식: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (URL에서 복사한 형태)
 * - UUID 형식: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (표준 UUID)
 */
const notionIdSchema = z.string().refine(
  (val) =>
    /^[0-9a-f]{32}$/.test(val) ||
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val),
  "유효한 Notion 페이지 ID 형식이 아닙니다 (32자 문자열 또는 UUID 형식)"
);

export const quoteSchema = z.object({
  id: notionIdSchema,
  quoteNumber: z.string().min(1),
  title: z.string().min(1),
  clientName: z.string().min(1),
  clientCompany: z.string().optional(),
  issueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  validUntil: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(["draft", "sent", "accepted", "rejected"]),
  items: z.array(quoteItemSchema),
  subtotal: z.number().nonnegative(),
  taxRate: z.number().min(0).max(1),
  taxAmount: z.number().nonnegative(),
  totalAmount: z.number().nonnegative(),
  notes: z.string().optional(),
  issuerName: z.string().min(1),
  issuerContact: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
