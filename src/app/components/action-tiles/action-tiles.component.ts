import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-tiles.component.html',
  styleUrls: ['./action-tiles.component.scss'],
})
export class ActionTilesComponent {
  private router = inject(Router);

  tiles = [
    {
      id: 'score-simulator',
      title: 'Score Simulator',
      description: 'Simulate your score',
      icon: '🧮',
      route: '/score-simulator',
    },
    {
      id: 'credit-goals',
      title: 'Credit Goals',
      description: 'Set and track your goals',
      icon: '🎯',
      route: '/credit-goals',
    },
    {
      id: 'recent-activities',
      title: 'Recent Activities',
      description: 'View your latest activities',
      icon: '📋',
      route: '/recent-activities',
    },
    {
      id: 'full-report',
      title: 'Full Report',
      description: 'View complete credit report',
      icon: '📊',
      route: '/full-report',
    },
    {
      id: 'learn-credit',
      title: 'Learn Credit',
      description: 'Educational resources',
      icon: '📚',
      route: '/learn-credit',
    },
  ];

  navigateToTile(route: string): void {
    this.router.navigate([route]);
  }
}
