import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-goals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-goals.component.html',
  styleUrls: ['./credit-goals.component.scss'],
})
export class CreditGoalsComponent {
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}
