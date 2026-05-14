export interface Transaction {
  transactionID: number;
  businessID: number;
  type: 'Sale' | 'Purchase' | 'Export' | 'Import';
  amount: number;
  date: string;
  status: string;
  counterparty?: string;
  invoiceNumber?: string;
  description?: string;
}

export interface TransactionCreateViewModel {
  type: string;
  amount: number;
  counterparty: string;
  invoiceNumber?: string;
  description?: string;
}
