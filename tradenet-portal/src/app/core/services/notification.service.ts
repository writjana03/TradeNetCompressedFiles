import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, startWith, switchMap } from 'rxjs';
import { environment } from '../env/environment';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apis.baseUrl;

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notification`);
  }

  // Polls every 30 seconds
  pollNotifications(): Observable<Notification[]> {
    return interval(30000).pipe(
      startWith(0),
      switchMap(() => this.getNotifications())
    );
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/notification/${notificationId}/read`, {});
  }
}
