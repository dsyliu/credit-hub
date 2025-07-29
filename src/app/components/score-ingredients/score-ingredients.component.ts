import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScoreIngredient } from '../../models/credit-report.model';

@Component({
  selector: 'app-score-ingredients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-ingredients.component.html',
  styleUrls: ['./score-ingredients.component.scss']
})
export class ScoreIngredientsComponent {
  @Input() ingredients: ScoreIngredient[] = [];

  constructor(private router: Router) {}

  onIngredientClick(ingredient: ScoreIngredient): void {
    // Navigate to L2 page - will be implemented later
    this.router.navigate(['/ingredient', ingredient.id]);
  }



  getImpactClass(impact: ScoreIngredient['impact']): string {
    switch (impact) {
      case 'positive': return 'positive-impact';
      case 'negative': return 'negative-impact';
      case 'neutral': return 'neutral-impact';
      default: return 'neutral-impact';
    }
  }

  getImpactIcon(impact: ScoreIngredient['impact']): string {
    switch (impact) {
      case 'positive': return '↑';
      case 'negative': return '↓';
      case 'neutral': return '';
      default: return '';
    }
  }
}