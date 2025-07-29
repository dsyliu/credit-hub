export interface CreditScore {
  score: number;
  date: string;
}

export interface ScoreIngredient {
  id: string;
  name: string;
  score: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  icon: string;
}

export interface CreditChange {
  type: 'increase' | 'decrease' | 'new' | 'removed';
  description: string;
  impact: number;
  changeDetail?: string; // e.g., "10% → 18%" or "2 → 3 accounts"
}

export interface CreditReport {
  currentScore: number;
  previousScore: number;
  scoreHistory: CreditScore[];
  changes: CreditChange[];
  scoreIngredients: ScoreIngredient[];
  lastUpdated: string;
}