import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getIngredientMapping, IngredientMapping } from '../../constants/score-ingredient-mapping';

@Component({
  selector: 'app-length-of-credit-history-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './length-of-credit-history-detail.component.html',
  styleUrls: ['./length-of-credit-history-detail.component.scss']
})
export class LengthOfCreditHistoryDetailComponent implements OnInit {
  private router = inject(Router);
  
  ingredientMapping: IngredientMapping | null = null;

  ngOnInit(): void {
    this.ingredientMapping = getIngredientMapping('age-of-credit');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}