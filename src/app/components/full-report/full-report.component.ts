import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-report.component.html',
  styleUrls: ['./full-report.component.scss']
})
export class FullReportComponent {
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}