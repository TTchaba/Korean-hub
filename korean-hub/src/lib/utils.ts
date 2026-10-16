/** Joins class names, skipping anything empty: cn("a", false, "b") -> "a b" */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const CURRENCY_SYMBOLS: Record<string, string> = { GEL: "₾", USD: "$", EUR: "€", GBP: "£" };

/** formatPrice(120, "GEL") -> "₾120". A price of 0 shows the "[PRICE]" placeholder. */
export function formatPrice(price: number, currency: string): string {
  if (price <= 0) return "[PRICE]";
  return `${CURRENCY_SYMBOLS[currency] ?? currency + " "}${price.toLocaleString("en-US")}`;
}
