import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import urls from "./urls";
import { QueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

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

export function debounce<Params extends any[]>(
	func: (...args: Params) => any,
	timeout: number = 1000
): (...args: Params) => void {
	let timer: NodeJS.Timeout;
	return (...args: Params) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
}

export function logout(reroute: boolean = true) {
	const qc = new QueryClient();

	qc.invalidateQueries();
	localStorage.removeItem("token");
	signOut({ callbackUrl: urls.auth.login() });
}

export function getAxiosErrorMessage(error: any) {
	return error?.response?.data?.message || error?.message;
}
