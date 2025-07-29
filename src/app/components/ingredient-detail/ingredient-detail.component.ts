import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-ingredient-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.scss']
})
export class IngredientDetailComponent implements OnInit {
  ingredientId: string | null = null;
  ingredientName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ingredientId = this.route.snapshot.paramMap.get('id');
    this.ingredientName = this.getIngredientName(this.ingredientId);
  }

  private getIngredientName(id: string | null): string {
    switch (id) {
      case 'payment-history': return 'Payment History';
      case 'amount-of-debt': return 'Amount of Debt';
      case 'length-of-credit': return 'Length of Credit History';
      case 'new-credit': return 'Amount of New Credit';
      case 'credit-mix': return 'Credit Mix';
      default: return 'Unknown Ingredient';
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}