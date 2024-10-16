import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 duration-300",
	{
		variants: {
			variant: {
				default:
					"bg-primary border-2 border-primary px-2 py-2 text-white hover:border-primary hover:bg-white hover:text-primary disabled:cursor-not-allowed disabled:opacity-50",
				outline:
					"bg-transparent border-2 border-primary px-2 py-2 text-primary hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50",
				// blue: "border-2 border-blue-500 bg-blue-500 px-2 py-2 text-white hover:border-blue-500 hover:bg-white hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
				dropdown:
					"text-left justify-start px-0 py-0 hover:bg-primary hover:text-white",
				faint:
					"bg-primary-50 border-2 border-primary-50 px-2 py-2 text-primary-500 hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50",
				header_icon:
					"text-2xl text-primary hover:bg-neutral-200/50 hover:shadow",
				plain: "",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 px-3",
				lg: "h-11 px-8",
				icon: "h-10 w-10",
				dropdown: "h-10 px-4",
				plain: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
