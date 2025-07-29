import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  date: Date;
  isRead: boolean;
  actionRequired: boolean;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  private router = inject(Router);

  // Mock alerts data - in real app this would come from a service
  alerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Credit Utilization Alert',
      message: 'Your credit utilization has increased to 22%. Consider paying down balances to improve your score.',
      date: new Date('2024-01-15'),
      isRead: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'info',
      title: 'New Account Detected',
      message: 'A new credit account was added to your report. Review the details to ensure accuracy.',
      date: new Date('2024-01-12'),
      isRead: false,
      actionRequired: true
    },
    {
      id: '3',
      type: 'success',
      title: 'Score Improvement',
      message: 'Congratulations! Your credit score has improved by 15 points this month.',
      date: new Date('2024-01-10'),
      isRead: false,
      actionRequired: false
    },
    {
      id: '4',
      type: 'info',
      title: 'Monthly Report Available',
      message: 'Your monthly credit report is now available for review.',
      date: new Date('2024-01-08'),
      isRead: true,
      actionRequired: false
    },
    {
      id: '5',
      type: 'warning',
      title: 'Payment Due Reminder',
      message: 'You have a payment due in 3 days. Make sure to pay on time to maintain your score.',
      date: new Date('2024-01-05'),
      isRead: true,
      actionRequired: true
    }
  ];

  goBack(): void {
    this.router.navigate(['/']);
  }

  markAsRead(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isRead = true;
    }
  }

  markAllAsRead(): void {
    this.alerts.forEach(alert => alert.isRead = true);
  }

  getAlertIcon(type: string): string {
    switch (type) {
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  }

  getUnreadCount(): number {
    return this.alerts.filter(alert => !alert.isRead).length;
  }

  getActionRequiredCount(): number {
    return this.alerts.filter(alert => alert.actionRequired && !alert.isRead).length;
  }
}