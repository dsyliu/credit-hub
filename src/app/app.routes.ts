import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  
  // Specific ingredient detail routes
  { path: 'ingredient/payment-history', loadComponent: () => import('./components/payment-history-detail/payment-history-detail.component').then(m => m.PaymentHistoryDetailComponent) },
  { path: 'ingredient/amount-of-debt', loadComponent: () => import('./components/amount-of-debt-detail/amount-of-debt-detail.component').then(m => m.AmountOfDebtDetailComponent) },
  { path: 'ingredient/age-of-credit', loadComponent: () => import('./components/length-of-credit-history-detail/length-of-credit-history-detail.component').then(m => m.LengthOfCreditHistoryDetailComponent) },
  { path: 'ingredient/new-credit', loadComponent: () => import('./components/amount-of-new-credit-detail/amount-of-new-credit-detail.component').then(m => m.AmountOfNewCreditDetailComponent) },
  { path: 'ingredient/credit-mix', loadComponent: () => import('./components/credit-mix-detail/credit-mix-detail.component').then(m => m.CreditMixDetailComponent) },
  
  // Generic ingredient detail route (fallback)
  { path: 'ingredient/:id', loadComponent: () => import('./components/ingredient-detail/ingredient-detail.component').then(m => m.IngredientDetailComponent) },
  
  // Action tile routes
  { path: 'score-simulator', loadComponent: () => import('./components/score-simulator/score-simulator.component').then(m => m.ScoreSimulatorComponent) },
  { path: 'credit-goals', loadComponent: () => import('./components/credit-goals/credit-goals.component').then(m => m.CreditGoalsComponent) },
  { path: 'recent-activities', loadComponent: () => import('./components/recent-activities/recent-activities.component').then(m => m.RecentActivitiesComponent) },
  { path: 'full-report', loadComponent: () => import('./components/full-report/full-report.component').then(m => m.FullReportComponent) },
  { path: 'learn-credit', loadComponent: () => import('./components/learn-credit/learn-credit.component').then(m => m.LearnCreditComponent) },
  
  // Alerts route
  { path: 'alerts', loadComponent: () => import('./components/alerts/alerts.component').then(m => m.AlertsComponent) },
  
  { path: '**', redirectTo: '' }
];
