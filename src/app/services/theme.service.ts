import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    // Check for session theme preference or default to light mode
    const sessionTheme = sessionStorage.getItem('theme');
    const isDark = sessionTheme === 'dark';
    this.setDarkMode(isDark);
  }

  toggleTheme(): void {
    this.setDarkMode(!this.isDarkModeSubject.value);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkModeSubject.next(isDark);
    sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Apply theme to document body
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }
}