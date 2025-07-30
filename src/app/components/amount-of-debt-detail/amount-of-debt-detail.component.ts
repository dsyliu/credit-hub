import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getIngredientMapping, IngredientMapping } from '../../constants/score-ingredient-mapping';

@Component({
  selector: 'app-amount-of-debt-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amount-of-debt-detail.component.html',
  styleUrls: ['./amount-of-debt-detail.component.scss']
})
export class AmountOfDebtDetailComponent implements OnInit {
  private router = inject(Router);
  
  ingredientMapping: IngredientMapping | null = null;

  ngOnInit(): void {
    this.ingredientMapping = getIngredientMapping('amount-of-debt');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}