import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerts-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts-button.component.html',
  styleUrls: ['./alerts-button.component.scss']
})
export class AlertsButtonComponent {
  private router = inject(Router);

  // Mock alert count - in real app this would come from a service
  alertCount = 3;

  navigateToAlerts(): void {
    this.router.navigate(['/alerts']);
  }
}