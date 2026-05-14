import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../env/environment'; // Ensure this path is correct for your teammate's env
import { LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use the new teammate style: baseUrl or specific account path
  private accountApi = environment.apis.account; 

  private currentUserSubject = new BehaviorSubject<any>(
    JSON.parse(sessionStorage.getItem('currentUser') || 'null')
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const request = { email, password };
    // Updated to use the new environment variable structure
    return this.http.post<LoginResponse>(`${this.accountApi}/login`, request)
      .pipe(tap(response => {
        // Updated check: your .NET Login returns 'user' object in the response
        if (response && (response.userID || (response as any).user?.userID)) {
          const userData = (response as any).user || response;
          sessionStorage.setItem('currentUser', JSON.stringify(userData));
          sessionStorage.setItem('userID', userData.userID.toString());
          sessionStorage.setItem('userName', userData.name || userData.userName || '');
          sessionStorage.setItem('token', (response as any).token || '');
          this.currentUserSubject.next(userData);
        }
      }));
  }

  // --- UPDATED REGISTER METHOD ---
  // Now accepts a single object (registrationData) instead of 4 strings
  register(registrationData: any): Observable<any> {
    // Sends the nested { user: {...}, business: {...} } object to the API
    return this.http.post(`${this.accountApi}/register`, registrationData);
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userID');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): number {
    const userId = sessionStorage.getItem('userID');
    return userId ? parseInt(userId) : 0;
  }

  getCurrentUserName(): string | null {
    return sessionStorage.getItem('userName');
  }
}