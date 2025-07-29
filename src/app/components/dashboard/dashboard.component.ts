import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditReportService } from '../../services/credit-report.service';
import { CreditReport } from '../../models/credit-report.model';
import { ScoreDisplayComponent } from '../score-display/score-display.component';
import { ScoreChartComponent } from '../score-chart/score-chart.component';
import { ChangesOverviewComponent } from '../changes-overview/changes-overview.component';
import { ScoreIngredientsComponent } from '../score-ingredients/score-ingredients.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ActionTilesComponent } from '../action-tiles/action-tiles.component';
import { AlertsButtonComponent } from '../alerts-button/alerts-button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ScoreDisplayComponent,
    ScoreChartComponent,
    ChangesOverviewComponent,
    ScoreIngredientsComponent,
    ThemeToggleComponent,
    ActionTilesComponent,
    AlertsButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  creditReport: CreditReport | null = null;
  loading = true;
  activeTab: 'history' | 'analysis' = 'history';

  constructor(private creditReportService: CreditReportService) {}

  ngOnInit(): void {
    this.loadCreditReport();
  }

  private loadCreditReport(): void {
    this.creditReportService.getCreditReport().subscribe({
      next: (report) => {
        this.creditReport = report;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading credit report:', error);
        this.loading = false;
      }
    });
  }

  setActiveTab(tab: 'history' | 'analysis'): void {
    this.activeTab = tab;
  }

  getPositiveAnalysis(): string {
    if (!this.creditReport) return '';
    
    const currentScore = this.creditReport.currentScore;
    const scoreChange = currentScore - this.creditReport.previousScore;
    
    let analysis = '';
    
    if (scoreChange > 0) {
      analysis += `Your credit score has improved by ${scoreChange} points this month, showing positive momentum. `;
    }

    if (currentScore >= 670) {
      analysis += 'You maintain a good credit score in the "Good" to "Very Good" range, which qualifies you for good interest rates from many vendors. ';
    } else if (currentScore >= 740) {
      analysis += 'You maintain an excellent credit score in the "Very Good" to "Exceptional" range, which qualifies you for the best interest rates and credit terms. ';
    }
    
    analysis += 'Your payment history remains strong with consistent on-time payments. Your credit utilization has been managed well, staying within recommended ranges.';
    
    return analysis;
  }

  getNegativeAnalysis(): string {
    if (!this.creditReport) return '';
    
    const currentScore = this.creditReport.currentScore;
    const scoreChange = currentScore - this.creditReport.previousScore;
    
    let analysis = '';
    
    if (scoreChange < 0) {
      analysis += `Your credit score decreased by ${Math.abs(scoreChange)} points this month all of sudden. `;
    }
    
    analysis += 'Credit utilization increased from 15% to 22%, which negatively impacts your score and interrupts your score growth. Consider paying down balances to get below 10% utilization. ';
    analysis += 'Your total revolving account balances increased significantly, contributing to higher utilization ratios.';
    
    return analysis;
  }

  getPatternAnalysis(): string {
    if (!this.creditReport) return '';
    
    return 'Over the past 12 months, your credit score has shown an overall upward trend with some recent volatility. ' +
           'The data shows a pattern of score improvements following periods of lower credit utilization. ' +
           'Your score tends to be most stable when utilization stays below 20%. ' +
           'Recent fluctuations appear to be primarily driven by changes in revolving account balances rather than payment history issues.';
  }
}