import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./button";

export interface LinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		VariantProps<typeof buttonVariants> {
	href: string;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<Link
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
ButtonLink.displayName = "Link";

export { ButtonLink };
