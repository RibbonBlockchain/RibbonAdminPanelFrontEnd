import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import urls from "./urls";
import { QueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { AxiosError } from "axios";

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

export function getTimeAgo(dateString: string): string {
	// Parse the date string
	const date = new Date(dateString);

	// Calculate the difference in milliseconds between the given date and now
	const now = Date.now();
	const difference = now - date.getTime();

	// Calculate the time units
	const minutes = Math.floor(difference / 1000 / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	// Determine the text based on the time units
	if (days >= 2) {
		return `${days} days ago`;
	} else if (days === 1) {
		return `1 day ago`;
	} else if (hours >= 2) {
		return `${hours} hours ago`;
	} else if (hours === 1) {
		return `1 hour ago`;
	} else if (minutes <= 2) {
		return `now`;
	} else {
		return `${minutes} min ago`;
	}
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

export function getErrorMessage(error: any) {
	if (error instanceof AxiosError) {
		return error.response?.data?.message || error.message;
	}

	return error?.message || "Something went wrong!";
}
