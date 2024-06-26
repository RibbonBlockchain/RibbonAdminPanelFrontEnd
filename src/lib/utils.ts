import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import urls from "./urls";
import { QueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { months } from "./constants";

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

export function formatTime(isoDatetimeString: string): string {
	const date = new Date(isoDatetimeString);

	// Ensure valid Date object
	if (isNaN(date?.getTime())) {
		return "Invalid time";
	}

	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const meridiem = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

	return `${formattedHours}:${minutes}${meridiem}`;
}

export function formatDate(isoDatetimeString: string): string {
	const date = new Date(isoDatetimeString);

	// Ensure valid Date object
	if (isNaN(date?.getTime())) {
		return "Invalid date";
	}

	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
	const year = date.getFullYear().toString().slice(-2); // Extract last two digits of year

	return `${day}/${month}/${year}`;
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

	if (days > 7) {
		return formatDate(dateString);
	} else if (days === 7) {
		return `1 week ago`;
	} else if (days >= 2) {
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

export function getCurrentMonth(): string {
	const now = new Date();
	const monthNum = now.getMonth(); // Months are zero-indexed (January = 0)
	const monthNames = months.map((month) => month.id);
	return monthNames[monthNum];
}

export function getMonthDayYear(
	isoDate: string,
	options?: { shorten_month?: boolean }
): string {
	if (!isoDate) return "";
	const dateObj = new Date(isoDate);

	const month = dateObj.toLocaleString("en-US", { month: "long" });
	const day = dateObj.getDate().toString().padStart(2, "0");
	const year = dateObj.getFullYear();

	return `${options?.shorten_month ? month.slice(0, 3) : month} ${day}, ${year}`;
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
	// localStorage.removeItem("token");
	signOut({ callbackUrl: urls.auth.login() });
}

export function getErrorMessage(error: any) {
	if (error?.message) {
		return error.message;
	}

	return "Something went wrong!";
}
