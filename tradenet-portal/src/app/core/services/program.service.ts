import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { TradeProgram } from '../models/license.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = environment.apis.baseUrl;

  constructor(private http: HttpClient) {}

  getActivePrograms(): Observable<TradeProgram[]> {
    return this.http.get<TradeProgram[]>(`${this.apiUrl}/program`);
  }

  getProgramDetails(programId: number): Observable<TradeProgram> {
    return this.http.get<TradeProgram>(`${this.apiUrl}/program/${programId}`);
  }

  getAllPrograms(): Observable<TradeProgram[]> {
    return this.http.get<TradeProgram[]>(`${this.apiUrl}/program`);
  }
}
