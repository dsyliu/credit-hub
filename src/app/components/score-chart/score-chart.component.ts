import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CreditScore } from '../../models/credit-report.model';
import {
  CREDIT_SCORE_RANGES,
  getCreditScoreRange,
} from '../../constants/credit-score-ranges';

@Component({
  selector: 'app-score-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.scss'],
})
export class ScoreChartComponent implements OnInit, OnChanges {
  @Input() scoreHistory: CreditScore[] = [];

  chartOption: EChartsOption = {};

  ngOnInit(): void {
    this.updateChartOption();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scoreHistory']) {
      this.updateChartOption();
    }
  }

  private updateChartOption(): void {
    const dates = this.scoreHistory.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      });
    });

    const scores = this.scoreHistory.map((item) => item.score);

    // Calculate dynamic boundaries based on score range
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    
    // Add some padding for better visualization
    const padding = 20;
    const yAxisMin = Math.max(300, minScore - padding);
    const yAxisMax = Math.min(850, maxScore + padding);
    
    // Find all credit score ranges that actually contain data points
    const relevantRanges = new Set<string>();
    scores.forEach(score => {
      const range = getCreditScoreRange(score);
      relevantRanges.add(range.name);
    });
    
    // Get the actual range objects for ranges that contain data points
    const rangesWithData = CREDIT_SCORE_RANGES.filter(range => 
      relevantRanges.has(range.name)
    );
    
    // Create boundary lines for all relevant range boundaries
    const boundaryLines: unknown[] = [];
    const addedBoundaries = new Set<number>();
    
    rangesWithData.forEach(range => {
      // Always add both lower and upper boundaries for each relevant range
      
      // Add lower boundary if not already added
      if (!addedBoundaries.has(range.min)) {
        boundaryLines.push({
          yAxis: range.min,
          name: `${range.name} Lower`,
          lineStyle: {
            color: range.color,
            type: 'dashed',
            width: 2,
            opacity: 0.7
          },
          label: {
            formatter: `${range.name}: ${range.min}+`,
            position: 'insideEndTop',
            color: range.color,
            fontSize: 10,
            fontWeight: 'bold'
          }
        });
        addedBoundaries.add(range.min);
      }
      
      // Add upper boundary if not already added
      if (!addedBoundaries.has(range.max)) {
        boundaryLines.push({
          yAxis: range.max,
          name: `${range.name} Upper`,
          lineStyle: {
            color: range.color,
            type: 'dashed',
            width: 2,
            opacity: 0.7
          },
          label: {
            formatter: `${range.name}: ${range.max}`,
            position: 'insideEndBottom',
            color: range.color,
            fontSize: 10,
            fontWeight: 'bold'
          }
        });
        addedBoundaries.add(range.max);
      }
    });

    this.chartOption = {
      animationDuration: 2000,
      animationEasing: 'cubicOut',
      animationDelay: (idx: number) => idx * 100,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#3498db',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff',
        },
        formatter: (params: unknown) => {
          const param = Array.isArray(params) ? params[0] : params;
          const dataIndex = param.dataIndex as number;
          const date = new Date(this.scoreHistory[dataIndex].date);
          const formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          });
          return `${formattedDate}<br/>Credit Score: ${param.value}`;
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: {
          lineStyle: {
            color: '#7f8c8d',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#7f8c8d',
          fontSize: 12,
        },
      },
      yAxis: {
        type: 'value',
        min: yAxisMin,
        max: yAxisMax,
        interval: 25,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#7f8c8d',
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
      series: [
        {
          name: 'Credit Score',
          type: 'line',
          data: scores,
          smooth: true,
          animation: true,
          animationDuration: 2000,
          animationEasing: 'cubicOut',
          animationDelay: (idx: number) => idx * 150,
          lineStyle: {
            color: '#3498db',
            width: 3,
          },
          itemStyle: {
            color: '#3498db',
            borderColor: '#ffffff',
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(52, 152, 219, 0.5)',
            },
            scale: 1.1,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(52, 152, 219, 0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(52, 152, 219, 0.1)',
                },
              ],
            },
          },
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: true,
          symbolKeepAspect: true,
          markPoint: {
            animation: true,
            animationDuration: 1500,
            data: [
              {
                type: 'max',
                name: 'Highest',
                itemStyle: {
                  color: '#27ae60',
                },
                label: {
                  formatter: 'High: {c}',
                },
              },
              {
                type: 'min',
                name: 'Lowest',
                itemStyle: {
                  color: '#e74c3c',
                },
                label: {
                  formatter: 'Low: {c}',
                },
              },
            ],
          },
          markLine: {
            animation: true,
            animationDuration: 1000,
            symbol: 'none',
            data: boundaryLines,
          },
        },
      ],
    };
  }
}
