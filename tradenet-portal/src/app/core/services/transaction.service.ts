import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { Transaction, TransactionCreateViewModel } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apis.baseUrl;

  constructor(private http: HttpClient) {}

  getTransactionDetails(transactionId: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/transaction/${transactionId}`);
  }

  createTransaction(data: TransactionCreateViewModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/transaction`, data);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transaction`);
  }
}
