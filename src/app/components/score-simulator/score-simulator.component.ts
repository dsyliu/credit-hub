import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-simulator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-simulator.component.html',
  styleUrls: ['./score-simulator.component.scss']
})
export class ScoreSimulatorComponent {
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}