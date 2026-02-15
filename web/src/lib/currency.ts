import { CURRENCIES, type CurrencyCode } from "./constants";

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = "USD"
): string {
  const c = CURRENCIES[currency];
  const converted = amount * c.rate;
  return `${c.symbol}${converted.toLocaleString(c.locale, { maximumFractionDigits: 0 })}`;
}

export function currencySymbol(currency: CurrencyCode = "USD"): string {
  return CURRENCIES[currency]?.symbol ?? "$";
}
