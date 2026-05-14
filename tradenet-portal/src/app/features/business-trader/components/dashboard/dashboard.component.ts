import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LicenseService } from '@core/services/license.service';
import { TransactionService } from '@core/services/transaction.service';
import { ProgramService } from '@core/services/program.service';
import { AuthService } from '@core/services/auth.service';
import { DashboardViewModel } from '@core/models/dashboard.model';
import { TradeLicense, TradeProgram } from '@core/models/license.model';
import { Transaction } from '@core/models/transaction.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard: DashboardViewModel | null = null;
  activeTab = 'licenses';
  isLoading = true;

  // Detail modals
  selectedLicense: TradeLicense | null = null;
  selectedTransaction: Transaction | null = null;
  selectedProgram: TradeProgram | null = null;

  // New transaction form
  newTransaction = { type: '', amount: 0, counterparty: '', invoiceNumber: '', description: '' };
  txError = '';
  txSuccess = '';

  constructor(
    private licenseService: LicenseService,
    private transactionService: TransactionService,
    private programService: ProgramService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    forkJoin({
      licenses: this.licenseService.getAvailableLicenses(),
      programs: this.programService.getActivePrograms()
    }).subscribe({
      next: (result: any) => {
        const licenses = result.licenses || [];
        const programs = result.programs || [];
        
        const applied = licenses.filter((l: any) => l.applicationStatus);
        this.dashboard = {
          pendingLicenses: applied.filter((l: any) => l.applicationStatus?.includes('Pending')).length,
          approvedLicenses: applied.filter((l: any) => l.applicationStatus === 'Approved').length,
          pendingTransactions: 0,
          totalTransactionAmount: 0,
          appliedLicenses: applied,
          transactions: [],
          availableSubsidies: programs.filter((p: any) => p.status === 'Active') || []
        };
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading dashboard:', err);
        this.isLoading = false;
      }
    });
  }

  viewLicenseDetails(licenseId: number): void {
    this.licenseService.getLicenseDetails(licenseId).subscribe({
      next: (data: any) => { this.selectedLicense = data; },
      error: (err: any) => console.error('Error loading license details:', err)
    });
  }

  viewTransactionDetails(txId: number): void {
    this.transactionService.getTransactionDetails(txId).subscribe({
      next: (data: any) => { this.selectedTransaction = data; },
      error: (err: any) => console.error('Error loading transaction details:', err)
    });
  }

  viewProgramDetails(programId: number): void {
    this.programService.getProgramDetails(programId).subscribe({
      next: (data: any) => { this.selectedProgram = data; },
      error: (err: any) => console.error('Error loading program details:', err)
    });
  }

  getLicenseStatusClass(status: string): string {
    if (status === 'Approved') return 'bg-success';
    if (status?.includes('Rejected')) return 'bg-danger';
    return 'bg-warning text-dark';
  }

  getTxStatusClass(status: string): string {
    if (status === 'Completed') return 'bg-success';
    if (status === 'Failed') return 'bg-danger';
    return 'bg-warning text-dark';
  }

  submitTransaction(): void {
    if (!this.newTransaction.type || !this.newTransaction.amount || !this.newTransaction.counterparty) {
      this.txError = 'Please fill in all required fields.';
      return;
    }

    this.txError = '';
    this.transactionService.createTransaction(this.newTransaction as any).subscribe({
      next: (response: any) => {
        this.txSuccess = 'Transaction created successfully!';
        this.newTransaction = { type: '', amount: 0, counterparty: '', invoiceNumber: '', description: '' };
        setTimeout(() => { this.txSuccess = ''; }, 3000);
      },
      error: (err: any) => {
        this.txError = 'An error occurred. Please try again.';
        console.error('Error creating transaction:', err);
      }
    });
  }

  closeDetailModal(): void {
    this.selectedLicense = null;
    this.selectedTransaction = null;
    this.selectedProgram = null;
  }
}
