export interface IngredientAttribute {
  key: string;
  label: string;
  value: string | number;
  description?: string;
}

export interface IngredientMapping {
  id: string;
  name: string;
  attributes: IngredientAttribute[];
}

export const SCORE_INGREDIENT_MAPPING: Record<string, IngredientMapping> = {
  'amount-of-debt': {
    id: 'amount-of-debt',
    name: 'Amount of Debt',
    attributes: [
      {
        key: 'accounts_with_balances',
        label: 'Accounts with balances',
        value: 4,
        description:
          'Number of credit accounts currently carrying a balance - fewer is generally better for your score',
      },
      {
        key: 'total_revolving_balance',
        label: 'Total balance on revolving accounts',
        value: '$12,200',
        description:
          'Combined balance across all credit cards and lines of credit - lower balances improve your score',
      },
      {
        key: 'revolving_utilization',
        label: 'Revolving utilization',
        value: '22%',
        description:
          'Percentage of available credit currently being used - keep below 10% for optimal scoring',
      },
    ],
  },

  'payment-history': {
    id: 'payment-history',
    name: 'Payment History',
    attributes: [
      {
        key: '30plus_days_delinquent',
        label: 'Accounts with late payment 30+ days',
        value: '0',
        description:
          'Number of accounts with payments 30 or more days late - zero is excellent for your credit score',
      },
      {
        key: '60plus_days_delinquent',
        label: 'Accounts with late payment 60+ days',
        value: 0,
        description:
          'Number of accounts with payments 60 or more days late - zero shows strong payment discipline',
      },
      {
        key: 'derogatory_public_record',
        label: 'Derogatory Public Record',
        value: '0',
        description:
          'Number of public records like bankruptcies or tax liens - zero is ideal for credit health',
      },
      {
        key: 'collections',
        label: 'Collections',
        value: '0',
        description:
          'Number of accounts sent to collections - zero demonstrates responsible debt management',
      },
      {
        key: 'recent_late_payment',
        label: 'Months since most recent late payment',
        value: '0',
        description:
          'Time elapsed since your last late payment - longer periods show improved payment habits',
      },
      {
        key: 'paid_accounts_percentage',
        label: 'Accounts always paid as agreed',
        value: '100%',
        description:
          'Percentage of accounts with perfect payment history - 100% is excellent for your score',
      },
    ],
  },

  'age-of-credit': {
    id: 'age-of-credit',
    name: 'Length of Credit History',
    attributes: [
      {
        key: 'oldest_account',
        label: 'Age of oldest account',
        value: '12 years',
        description:
          'Age of your oldest active credit account - longer history demonstrates credit experience',
      },
      {
        key: 'average_account_age',
        label: 'Average age of accounts',
        value: '6.5 years',
        description:
          'Average age of all your credit accounts - higher averages show established credit management',
      },
    ],
  },

  'credit-mix': {
    id: 'credit-mix',
    name: 'Credit Mix',
    attributes: [
      {
        key: 'revolving_accounts',
        label: 'Revolving accounts',
        value: 8,
        description:
          'Number of revolving credit accounts like credit cards and lines of credit',
      },
      {
        key: 'installment_loans',
        label: 'Installment Loans',
        value: 3,
        description:
          'Number of installment loans like auto loans, mortgages, and personal loans',
      },
      {
        key: 'bank_issued_cards',
        label: 'Bank-issued credit card accounts',
        value: 7,
        description:
          'Number of credit cards issued by banks - shows diverse credit relationships',
      },
    ],
  },

  'new-credit': {
    id: 'new-credit',
    name: 'Amount of New Credit',
    attributes: [
      {
        key: 'recent_inquiries',
        label: 'Number of recent inquiries',
        value: 0,
        description:
          'Hard inquiries in the past 12 months - fewer inquiries are better for your score',
      },
      {
        key: 'recently_opened_account',
        label: 'Age of most recently opened account',
        value: 7,
        description:
          'Months since your newest account was opened - older accounts show credit stability',
      },
    ],
  },
};

// Helper function to get mapping by ingredient ID
export function getIngredientMapping(
  ingredientId: string
): IngredientMapping | null {
  return SCORE_INGREDIENT_MAPPING[ingredientId] || null;
}

// Helper function to get all ingredient mappings
export function getAllIngredientMappings(): IngredientMapping[] {
  return Object.values(SCORE_INGREDIENT_MAPPING);
}

// Helper function to get specific attribute value
export function getIngredientAttributeValue(
  ingredientId: string,
  attributeKey: string
): string | number | null {
  const mapping = getIngredientMapping(ingredientId);
  if (!mapping) return null;

  const attribute = mapping.attributes.find(
    (attr) => attr.key === attributeKey
  );
  return attribute ? attribute.value : null;
}

// Helper function to search ingredients by attribute
export function findIngredientsByAttribute(
  attributeKey: string
): IngredientMapping[] {
  return Object.values(SCORE_INGREDIENT_MAPPING).filter((mapping) =>
    mapping.attributes.some((attr) => attr.key === attributeKey)
  );
}
