import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../core/models/notification.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  notifications: Notification[] = [];
  unreadCount = 0;
  showNotifications = false;
  private pollSub?: Subscription;

  constructor(
    public authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.pollSub = this.notificationService.pollNotifications().subscribe(
        data => {
          this.notifications = data;
          this.unreadCount = data.filter(n => n.status === 'Unread').length;
        },
        error => console.error('Error loading notifications:', error)
      );
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe(
      () => {
        const n = this.notifications.find(notif => notif.notificationID === id);
        if (n) {
          n.status = 'Read';
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        }
      },
      error => console.error('Error marking notification as read:', error)
    );
  }

  getNotificationIcon(category: string): string {
    const icons: Record<string, string> = {
      'License': 'fas fa-certificate text-primary',
      'Transaction': 'fas fa-exchange-alt text-success',
      'Program': 'fas fa-hand-holding-usd text-info',
      'Compliance': 'fas fa-exclamation-triangle text-warning'
    };
    return icons[category] || 'fas fa-bell text-secondary';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.pollSub) {
      this.pollSub.unsubscribe();
    }
  }
}
