import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CreditReport,
  CreditScore,
  ScoreIngredient,
  CreditChange,
} from '../models/credit-report.model';

@Injectable({
  providedIn: 'root',
})
export class CreditReportService {
  getCreditReport(): Observable<CreditReport> {
    // Mock data - replace with actual API call later
    const currentScore = 742;

    // Generate score history first to get the actual previous score
    const scoreHistory = this.generateMockScoreHistory(currentScore);
    const previousScore = scoreHistory[scoreHistory.length - 2].score; // Second to last score

    const mockData: CreditReport = {
      currentScore,
      previousScore,
      lastUpdated: new Date().toISOString(),
      scoreHistory,
      changes: this.generateMockChanges(currentScore, previousScore),
      scoreIngredients: this.generateMockScoreIngredients(),
    };

    return of(mockData);
  }

  private generateMockScoreHistory(currentScore: number): CreditScore[] {
    const history: CreditScore[] = [];
    const currentDate = new Date();

    // Fixed test data that spans multiple credit score ranges for testing boundary lines
    const testScores = [
      680, // Good range (670-739)
      685, // Good range
      695, // Good range
      710, // Good range
      725, // Good range
      735, // Good range
      745, // Very Good range (740-799)
      750, // Very Good range
      760, // Very Good range
      770, // Very Good range
      780, // Very Good range
      currentScore, // Current score (742 - Very Good)
    ];

    // Generate 12 months of data with the test scores
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);

      history.push({
        score: testScores[11 - i],
        date: date.toISOString().split('T')[0],
      });
    }

    return history;
  }

  private generateMockChanges(
    currentScore: number,
    previousScore: number
  ): CreditChange[] {
    const totalChange = currentScore - previousScore;

    // Create changes that add up to the actual score difference with realistic data changes
    const changes: CreditChange[] = [];

    if (totalChange !== 0) {
      if (totalChange > 0) {
        // Score increased - show positive changes with data details
        const primaryChange = Math.floor(totalChange * 0.7);
        const secondaryChange = totalChange - primaryChange;

        changes.push({
          type: 'decrease',
          description: 'Credit utilization decreased',
          impact: primaryChange,
          changeDetail: '22% → 15%',
        });

        if (secondaryChange > 0) {
          changes.push({
            type: 'increase',
            description: 'On-time payment streak extended',
            impact: secondaryChange,
            changeDetail: '18 → 19 months',
          });
        }
      } else {
        // Score decreased - show negative changes with data details
        const primaryNegative = Math.floor(totalChange * 0.6);
        const secondaryNegative = Math.floor(totalChange * 0.25);
        const tertiaryNegative =
          totalChange - primaryNegative - secondaryNegative;

        changes.push({
          type: 'increase',
          description: 'Credit utilization increased',
          impact: primaryNegative,
          changeDetail: '15% → 22%',
        });

        changes.push({
          type: 'increase',
          description: 'Total balance on revolving accounts increased',
          impact: secondaryNegative,
          changeDetail: '$8,500 → $12,200',
        });

        if (tertiaryNegative !== 0) {
          changes.push({
            type: 'decrease',
            description: 'Average account age decreased',
            impact: tertiaryNegative,
            changeDetail: '8.2 → 7.8 years',
          });
        }
      }
    } else {
      // No change
      changes.push({
        type: 'increase',
        description: 'No significant changes this month',
        impact: 0,
        changeDetail: 'All factors remained stable',
      });
    }

    return changes;
  }

  private generateMockScoreIngredients(): ScoreIngredient[] {
    return [
      {
        id: 'payment-history',
        name: 'Payment History',
        score: 95,
        impact: 'positive',
        description: 'Excellent payment history with no missed payments',
        icon: '💳',
      },
      {
        id: 'amount-of-debt',
        name: 'Amount of Debt',
        score: 78,
        impact: 'neutral',
        description:
          'Credit utilization at 22% - consider reducing to below 10%',
        icon: '💰',
      },
      {
        id: 'length-of-credit',
        name: 'Length of Credit History',
        score: 85,
        impact: 'positive',
        description: 'Average account age of 8 years',
        icon: '📅',
      },
      {
        id: 'new-credit',
        name: 'Amount of New Credit',
        score: 72,
        impact: 'negative',
        description: '2 new accounts opened in the last 6 months',
        icon: '🆕',
      },
      {
        id: 'credit-mix',
        name: 'Credit Mix',
        score: 88,
        impact: 'positive',
        description: 'Good variety of credit types',
        icon: '🔄',
      },
    ];
  }
}
