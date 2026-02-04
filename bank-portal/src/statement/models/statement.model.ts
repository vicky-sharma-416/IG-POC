export interface Statement {
  transactionId: string;
  bankId: string;
  amount: number;
  direction: 'INWARD' | 'OUTWARD';
  timestamp: string;
}
