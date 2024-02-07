import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type CurrencyType = "USD" | "EUR" | "GBP" | "BDT";
export function formatPrice(
	price: number | string,
	options: {
		currency?: CurrencyType;
		notation?: Intl.NumberFormatOptions["notation"];
	} = {},
) {
	const { currency = "USD", notation = "compact" } = options;

	const numericPrice = typeof price === "string" ? parseFloat(price) : price;

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		notation,
		currency,
		maximumFractionDigits: 2,
	}).format(numericPrice);
}
