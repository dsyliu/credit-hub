import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="theme-toggle" 
      (click)="toggleTheme()"
      [attr.aria-label]="(themeService.isDarkMode$ | async) ? 'Switch to light mode' : 'Switch to dark mode'">
      <span class="toggle-icon">
        {{ (themeService.isDarkMode$ | async) ? '☀️' : '🌙' }}
      </span>
    </button>
  `,
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}