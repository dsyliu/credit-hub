import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import {
  getIngredientMapping,
  IngredientMapping,
} from '../../constants/score-ingredient-mapping';

interface DebtData {
  month: string;
  revolvingDebt: number;
  loanDebt: number;
  total: number;
}

@Component({
  selector: 'app-amount-of-debt-detail',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './amount-of-debt-detail.component.html',
  styleUrls: ['./amount-of-debt-detail.component.scss'],
})
export class AmountOfDebtDetailComponent implements OnInit {
  private router = inject(Router);

  ingredientMapping: IngredientMapping | null = null;
  debtHistory: DebtData[] = [];
  chartOption: EChartsOption = {};
  activeTab: 'credit' | 'loan' = 'credit';

  ngOnInit(): void {
    this.ingredientMapping = getIngredientMapping('amount-of-debt');
    this.generateDebtHistory();
    this.initChart();
  }

  private generateDebtHistory(): void {
    // Past 12 months ending with Aug 2025 as current month
    const months = [
      'Sep 2024',
      'Oct 2024',
      'Nov 2024',
      'Dec 2024',
      'Jan 2025',
      'Feb 2025',
      'Mar 2025',
      'Apr 2025',
      'May 2025',
      'Jun 2025',
      'Jul 2025',
      'Aug 2025',
    ];

    // Generate realistic debt progression data with Aug 2025 totaling $12,200
    // Loan starts high and reduces gradually, credit cards fluctuate
    const startingLoanAmount = 9500; // Starting loan amount (Sep 2024)
    const endingLoanAmount = 7400; // Ending loan amount (Aug 2025)
    const monthlyLoanReduction = (startingLoanAmount - endingLoanAmount) / 11; // Gradual reduction over 11 months

    this.debtHistory = months.map((month, index) => {
      let revolvingDebt: number;
      let loanDebt: number;

      // Calculate loan debt with gradual reduction
      loanDebt = startingLoanAmount - monthlyLoanReduction * index;

      // Add small random variation to make it realistic (±$50)
      const loanVariation = (Math.random() - 0.5) * 100;
      loanDebt = Math.max(0, loanDebt + loanVariation);

      // Calculate credit card debt to reach target total for Aug 2025
      if (index === 11) {
        // Aug 2025: Set exact values to match UI
        loanDebt = 7365;
        revolvingDebt = 4835;
      } else {
        // Credit cards fluctuate but generally trend upward slightly
        const baseCreditCards = 4200;
        const creditCardTrend = index * 30; // Slight upward trend
        const creditCardVariation = (Math.random() - 0.5) * 600;

        revolvingDebt = Math.max(
          0,
          baseCreditCards + creditCardTrend + creditCardVariation
        );
      }

      return {
        month: this.formatMonthYear(month), // Format as "Aug 24"
        revolvingDebt: Math.round(revolvingDebt),
        loanDebt: Math.round(loanDebt),
        total: Math.round(revolvingDebt + loanDebt),
      };
    });
  }

  private initChart(): void {
    const months = this.debtHistory.map((d) => d.month);
    const revolvingData = this.debtHistory.map((d) => d.revolvingDebt);
    const loanData = this.debtHistory.map((d) => d.loanDebt);

    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: any) => {
          const paramsArray = Array.isArray(params) ? params : [params];
          let result = `<strong>${paramsArray[0].axisValue}</strong><br/>`;
          let total = 0;
          paramsArray.forEach((param: unknown) => {
            const p = param as any;
            const value = typeof p.value === 'number' ? p.value : 0;
            result += `${p.marker}${p.seriesName}: ${this.formatCurrency(
              value
            )}<br/>`;
            total += value;
          });
          result += `<strong>Total: ${this.formatCurrency(total)}</strong>`;
          return result;
        },
      },
      legend: {
        data: ['Loans', 'Credit Cards'],
        bottom: 10,
        textStyle: {
          color: '#666',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: months,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            color: '#666',
          },
          axisLine: {
            lineStyle: {
              color: '#ddd',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: (value: number) => {
              return value >= 1000
                ? `$${(value / 1000).toFixed(0)}k`
                : `$${value}`;
            },
            color: '#666',
          },
          axisLine: {
            lineStyle: {
              color: '#ddd',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0',
            },
          },
        },
      ],
      series: [
        {
          name: 'Loans',
          type: 'bar',
          stack: 'debt',
          emphasis: {
            focus: 'series',
          },
          data: loanData,
          itemStyle: {
            color: {
              image: this.createPatternCanvas('diagonal', '#22c55e', '#16a34a'),
              repeat: 'repeat',
            },
            borderRadius: [0, 0, 6, 6],
            borderColor: '#16a34a',
            borderWidth: 1,
          },
        },
        {
          name: 'Credit Cards',
          type: 'bar',
          stack: 'debt',
          emphasis: {
            focus: 'series',
          },
          data: revolvingData,
          itemStyle: {
            color: {
              image: this.createPatternCanvas('dots', '#3b82f6', '#2563eb'),
              repeat: 'repeat',
            },
            borderRadius: [6, 6, 0, 0],
            borderColor: '#2563eb',
            borderWidth: 1,
          },
        },
      ],
      animationDuration: 1000,
      animationEasing: 'cubicOut',
    };
  }

  private createPatternCanvas(
    pattern: 'diagonal' | 'dots',
    color1: string,
    color2: string
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    if (pattern === 'diagonal') {
      // Create diagonal stripe pattern for loans
      canvas.width = 20;
      canvas.height = 20;

      // Fill with base color
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, 20, 20);

      // Add diagonal stripes
      ctx.strokeStyle = color2;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = -20; i <= 40; i += 6) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 20, 20);
      }
      ctx.stroke();
    } else if (pattern === 'dots') {
      // Create dot pattern for credit cards
      canvas.width = 16;
      canvas.height = 16;

      // Fill with base color
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, 16, 16);

      // Add dots
      ctx.fillStyle = color2;
      ctx.beginPath();
      ctx.arc(4, 4, 2, 0, 2 * Math.PI);
      ctx.arc(12, 4, 2, 0, 2 * Math.PI);
      ctx.arc(4, 12, 2, 0, 2 * Math.PI);
      ctx.arc(12, 12, 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    return canvas;
  }

  private formatMonthYear(monthYear: string): string {
    const [month, year] = monthYear.split(' ');
    const shortYear = year.slice(-2); // Get last 2 digits of year
    return `${month} ${shortYear}`;
  }

  setActiveTab(tab: 'credit' | 'loan'): void {
    this.activeTab = tab;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
