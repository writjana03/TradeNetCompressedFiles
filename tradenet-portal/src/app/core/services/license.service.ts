import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { TradeLicense, LicenseApplicationRequest } from '../models/license.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  private apiUrl = environment.apis.baseUrl;

  constructor(private http: HttpClient) {}

  getAvailableLicenses(): Observable<TradeLicense[]> {
    return this.http.get<TradeLicense[]>(`${this.apiUrl}/license`);
  }

  getLicenseDetails(licenseId: number): Observable<TradeLicense> {
    return this.http.get<TradeLicense>(`${this.apiUrl}/license/${licenseId}`);
  }

  applyForLicense(request: any): Observable<any> {
    const formData = new FormData();
    formData.append('licenseID', request.licenseID.toString());
    formData.append('licenseType', request.licenseType);
    formData.append('title', request.title);
    formData.append('description', request.description);
    
    if (request.additionalNotes) {
      formData.append('additionalNotes', request.additionalNotes);
    }
    
    if (request.documents && request.documents.length > 0) {
      request.documents.forEach((file: File, index: number) => {
        formData.append('documents', file, file.name);
      });
    }
    
    return this.http.post(`${this.apiUrl}/license/apply`, formData);
  }

  createLicense(license: TradeLicense): Observable<TradeLicense> {
    return this.http.post<TradeLicense>(`${this.apiUrl}/license`, license);
  }

  updateLicense(licenseId: number, license: TradeLicense): Observable<any> {
    return this.http.put(`${this.apiUrl}/license/${licenseId}`, license);
  }
}
