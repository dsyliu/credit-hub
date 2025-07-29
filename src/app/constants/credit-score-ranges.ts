export interface CreditScoreRange {
  name: string;
  min: number;
  max: number;
  color: string;
  description: string;
}

export const CREDIT_SCORE_RANGES: CreditScoreRange[] = [
  {
    name: 'Poor',
    min: 300,
    max: 580,
    color: '#e74c3c',
    description: 'Poor credit score - may have difficulty obtaining credit'
  },
  {
    name: 'Fair',
    min: 580,
    max: 669,
    color: '#f39c12',
    description: 'Fair credit score - limited credit options with higher rates'
  },
  {
    name: 'Good',
    min: 670,
    max: 739,
    color: '#f1c40f',
    description: 'Good credit score - access to most credit products'
  },
  {
    name: 'Very Good',
    min: 740,
    max: 799,
    color: '#2ecc71',
    description: 'Very good credit score - excellent credit terms available'
  },
  {
    name: 'Exceptional',
    min: 800,
    max: 850,
    color: '#27ae60',
    description: 'Exceptional credit score - best rates and terms available'
  }
];

/**
 * Get the credit score range for a given score
 * @param score The credit score to evaluate
 * @returns The corresponding CreditScoreRange object
 */
export function getCreditScoreRange(score: number): CreditScoreRange {
  return CREDIT_SCORE_RANGES.find(range => score >= range.min && score <= range.max) 
    || CREDIT_SCORE_RANGES[0]; // Default to 'Poor' if no match found
}

/**
 * Get the credit score range name for a given score
 * @param score The credit score to evaluate
 * @returns The range name (e.g., 'Very Good')
 */
export function getCreditScoreRangeName(score: number): string {
  return getCreditScoreRange(score).name;
}

/**
 * Get the color associated with a credit score
 * @param score The credit score to evaluate
 * @returns The hex color code for the score range
 */
export function getCreditScoreColor(score: number): string {
  return getCreditScoreRange(score).color;
}