import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { Business, BusinessDocument, ProfileViewModel } from '../models/business.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = environment.apis.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfile(): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    return this.http.get(`${this.apiUrl}/business/user/${userId}`);
  }

  updateProfile(business: Partial<Business>): Observable<any> {
    return this.http.put(`${this.apiUrl}/business/${business.businessID}`, business);
  }

  createBusiness(business: Business): Observable<Business> {
    return this.http.post<Business>(`${this.apiUrl}/business`, business);
  }

  uploadDocuments(businessId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    return this.http.post(`${this.apiUrl}/business/${businessId}/upload-documents`, formData);
  }

  getBusinessDocuments(businessId: number): Observable<BusinessDocument[]> {
    return this.http.get<BusinessDocument[]>(`${this.apiUrl}/business/${businessId}/documents`);
  }

  uploadProfilePhoto(businessId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/business/${businessId}/upload-photo`, formData);
  }
}
