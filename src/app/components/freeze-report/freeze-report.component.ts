import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freeze-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './freeze-report.component.html',
  styleUrls: ['./freeze-report.component.scss']
})
export class FreezeReportComponent {
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}