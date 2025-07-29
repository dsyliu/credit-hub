import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn-credit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learn-credit.component.html',
  styleUrls: ['./learn-credit.component.scss']
})
export class LearnCreditComponent {
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}