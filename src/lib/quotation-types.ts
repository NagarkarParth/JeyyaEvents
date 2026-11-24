export type QuotationItem = { id: string; itemName: string; quantity: number; unitPrice: number; total: number };
export type Quotation = { id: string; number: string; date: string; customerName: string; mobile: string; address: string; items: QuotationItem[]; subtotal: number; gstRate: number; gstAmount: number; total: number; terms: string };
