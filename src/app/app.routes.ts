import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'ingredient/:id', loadComponent: () => import('./components/ingredient-detail/ingredient-detail.component').then(m => m.IngredientDetailComponent) },
  { path: 'score-simulator', loadComponent: () => import('./components/score-simulator/score-simulator.component').then(m => m.ScoreSimulatorComponent) },
  { path: 'credit-goals', loadComponent: () => import('./components/credit-goals/credit-goals.component').then(m => m.CreditGoalsComponent) },
  { path: 'recent-activities', loadComponent: () => import('./components/recent-activities/recent-activities.component').then(m => m.RecentActivitiesComponent) },
  { path: 'freeze-report', loadComponent: () => import('./components/freeze-report/freeze-report.component').then(m => m.FreezeReportComponent) },
  { path: 'learn-credit', loadComponent: () => import('./components/learn-credit/learn-credit.component').then(m => m.LearnCreditComponent) },
  { path: 'alerts', loadComponent: () => import('./components/alerts/alerts.component').then(m => m.AlertsComponent) },
  { path: '**', redirectTo: '' }
];
