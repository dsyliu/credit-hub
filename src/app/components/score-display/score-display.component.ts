import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { getCreditScoreRange, getCreditScoreRangeName, getCreditScoreColor, CREDIT_SCORE_RANGES } from '../../constants/credit-score-ranges';

@Component({
  selector: 'app-score-display',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.scss']
})
export class ScoreDisplayComponent implements OnInit, OnChanges {
  @Input() currentScore: number = 0;
  @Input() previousScore: number = 0;
  
  gaugeOption: EChartsOption = {};

  get scoreChange(): number {
    return this.currentScore - this.previousScore;
  }

  get scoreChangeText(): string {
    const change = Math.abs(this.scoreChange);
    if (this.scoreChange > 0) {
      return `+${change}`;
    } else if (this.scoreChange < 0) {
      return `-${change}`;
    }
    return 'No change';
  }

  get scoreChangeClass(): string {
    if (this.scoreChange > 0) return 'positive';
    if (this.scoreChange < 0) return 'negative';
    return 'neutral';
  }

  get scoreRating(): string {
    return getCreditScoreRangeName(this.currentScore);
  }

  get scoreColor(): string {
    return getCreditScoreColor(this.currentScore);
  }

  get scoreSegments() {
    const totalRange = 850 - 300; // Total score range
    const circumference = 2 * Math.PI * 85; // Circle circumference (r=85)
    const totalArc = circumference * 0.75; // Use 75% of circle (270 degrees)
    
    let currentOffset = 0;
    const currentRange = getCreditScoreRange(this.currentScore);
    
    return CREDIT_SCORE_RANGES.map(range => {
      const rangeSize = range.max - range.min;
      const segmentLength = (rangeSize / totalRange) * totalArc;
      const isActive = range.name === currentRange.name;
      
      const segment = {
        color: range.color,
        isActive,
        dashArray: `${segmentLength} ${circumference}`,
        dashOffset: -currentOffset
      };
      
      currentOffset += segmentLength;
      return segment;
    });
  }

  ngOnInit(): void {
    this.updateGaugeOption();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentScore']) {
      this.updateGaugeOption();
    }
  }

  private updateGaugeOption(): void {
    // Create axis tick data for the 5 credit score ranges
    const axisData = CREDIT_SCORE_RANGES.map(range => ({
      value: range.min,
      label: {
        color: range.color,
        fontSize: 10,
        fontWeight: 'bold'
      }
    }));
    
    // Add the final tick for the last range
    axisData.push({
      value: 850,
      label: {
        color: CREDIT_SCORE_RANGES[CREDIT_SCORE_RANGES.length - 1].color,
        fontSize: 10,
        fontWeight: 'bold'
      }
    });

    this.gaugeOption = {
      series: [
        {
          type: 'gauge',
          min: 300,
          max: 850,
          splitNumber: 5,
          radius: '95%',
          center: ['50%', '55%'],
          startAngle: 200,
          endAngle: -20,
          itemStyle: {
            color: this.scoreColor
          },
          progress: {
            show: false
          },
          pointer: {
            show: true,
            length: '12%',
            width: 3,
            offsetCenter: [0, '-65%'],
            itemStyle: {
              color: this.scoreColor,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 3
            }
          },
          axisLine: {
            lineStyle: {
              width: 16,
              color: CREDIT_SCORE_RANGES.map(range => [
                (range.max - 300) / (850 - 300), // Position as percentage
                range.color
              ])
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            distance: -35,
            color: '#999',
            fontSize: 10,
            formatter: (value: number) => {
              // Show labels only at range boundaries, excluding 740
              const isRangeBoundary = CREDIT_SCORE_RANGES.some(range => 
                range.min === value || range.max === value
              ) || value === 850;
              return (isRangeBoundary && value !== 740) ? value.toString() : '';
            }
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '15%'],
            fontSize: 24,
            fontWeight: 'bold',
            formatter: (value: number) => `{scoreColor|${value}}\n{ratingColor|${this.scoreRating}}`,
            rich: {
              scoreColor: {
                fontSize: 32,
                fontWeight: 'bold',
                color: this.scoreColor
              },
              ratingColor: {
                fontSize: 14,
                fontWeight: 500,
                color: this.scoreColor,
                padding: [5, 0, 0, 0]
              }
            }
          },
          data: [
            {
              value: this.currentScore,
              name: this.scoreRating
            }
          ]
        }
      ]
    };
  }
}