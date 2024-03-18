import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(
	price: number,
	options?: Intl.NumberFormatOptions
) {
	return Intl.NumberFormat(
		"en-US",
		options || {
			notation: "compact",
			maximumFractionDigits: 2,
		}
	).format(price);
}
