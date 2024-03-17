"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [show, setShow] = React.useState(false);

		return (
			<div className="relative">
				<input
					type={show ? "text" : "password"}
					className={cn(
						"flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 pr-24 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
						className
					)}
					ref={ref}
					{...props}
				/>
				<button
					type="button"
					onClick={() => setShow(!show)}
					className={cn(
						"absolute right-0.5 top-1/2 h-9 w-14 -translate-y-1/2 rounded-r-md bg-neutral-200 text-sm",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
					)}
				>
					{show ? "Hide" : "Show"}
				</button>
			</div>
		);
	}
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
