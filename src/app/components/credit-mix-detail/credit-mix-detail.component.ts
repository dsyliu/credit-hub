import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getIngredientMapping, IngredientMapping } from '../../constants/score-ingredient-mapping';

@Component({
  selector: 'app-credit-mix-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-mix-detail.component.html',
  styleUrls: ['./credit-mix-detail.component.scss']
})
export class CreditMixDetailComponent implements OnInit {
  private router = inject(Router);
  
  ingredientMapping: IngredientMapping | null = null;

  ngOnInit(): void {
    this.ingredientMapping = getIngredientMapping('credit-mix');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}