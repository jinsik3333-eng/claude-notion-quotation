/**
 * 견적서 타입 정의
 * Notion 데이터베이스 스키마 기반
 */

export interface QuoteItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  order: number;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  title: string;
  clientName: string;
  clientCompany?: string;
  issueDate: string;       // ISO 날짜 문자열 (YYYY-MM-DD)
  validUntil: string;      // ISO 날짜 문자열 (YYYY-MM-DD)
  status: QuoteStatus;
  items: QuoteItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
  issuerName: string;
  issuerContact?: string;
}

export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected";
