import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss']
})
export class RecentActivitiesComponent {
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}