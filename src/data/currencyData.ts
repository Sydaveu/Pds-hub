export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate relative to USD (1 USD = X Local Currency)
}

export const currencies: Currency[] = [
  { code: 'USD', name: 'United States Dollar', symbol: '$', rate: 1.0 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 155.50 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rate: 1.37 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'AU$', rate: 1.51 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.50 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 1450 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 18.50 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', rate: 129.50 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', rate: 12.00 },
];
