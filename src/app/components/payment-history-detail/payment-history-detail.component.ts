import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getIngredientMapping, IngredientMapping } from '../../constants/score-ingredient-mapping';

@Component({
  selector: 'app-payment-history-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-history-detail.component.html',
  styleUrls: ['./payment-history-detail.component.scss']
})
export class PaymentHistoryDetailComponent implements OnInit {
  private router = inject(Router);
  
  ingredientMapping: IngredientMapping | null = null;

  ngOnInit(): void {
    this.ingredientMapping = getIngredientMapping('payment-history');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}