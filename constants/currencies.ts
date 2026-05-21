export type Currency = {
  code: string;
  label: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "RON", label: "Romanian Leu", symbol: "lei" },
];

export function getCurrency(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}
