import { TradeLicense, TradeProgram } from './license.model';
import { Transaction } from './transaction.model';

export interface DashboardViewModel {
  pendingLicenses: number;
  approvedLicenses: number;
  pendingTransactions: number;
  totalTransactionAmount: number;
  appliedLicenses: TradeLicense[];
  transactions: Transaction[];
  availableSubsidies: TradeProgram[];
}
