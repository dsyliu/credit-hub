import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getIngredientMapping, IngredientMapping } from '../../constants/score-ingredient-mapping';

@Component({
  selector: 'app-amount-of-new-credit-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amount-of-new-credit-detail.component.html',
  styleUrls: ['./amount-of-new-credit-detail.component.scss']
})
export class AmountOfNewCreditDetailComponent implements OnInit {
  private router = inject(Router);
  
  ingredientMapping: IngredientMapping | null = null;

  ngOnInit(): void {
    this.ingredientMapping = getIngredientMapping('new-credit');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}