import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditChange } from '../../models/credit-report.model';

@Component({
  selector: 'app-changes-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './changes-overview.component.html',
  styleUrls: ['./changes-overview.component.scss']
})
export class ChangesOverviewComponent {
  @Input() changes: CreditChange[] = [];

  getChangeIcon(type: CreditChange['type']): string {
    switch (type) {
      case 'increase': return '📈';
      case 'decrease': return '📉';
      case 'new': return '🆕';
      case 'removed': return '🗑️';
      default: return '📊';
    }
  }

  getChangeClass(type: CreditChange['type']): string {
    switch (type) {
      case 'increase': return 'positive';
      case 'decrease': return 'negative';
      case 'new': return 'neutral';
      case 'removed': return 'neutral';
      default: return 'neutral';
    }
  }

  getImpactText(impact: number): string {
    if (impact > 0) {
      return `+${impact} points`;
    } else if (impact < 0) {
      return `${impact} points`;
    }
    return 'No impact';
  }

  getImpactClass(impact: number): string {
    if (impact > 0) return 'positive-impact';
    if (impact < 0) return 'negative-impact';
    return 'neutral-impact';
  }
}