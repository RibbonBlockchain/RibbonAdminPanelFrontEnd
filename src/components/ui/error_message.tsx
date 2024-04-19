import { cn } from "@/lib/utils";
import React from "react";

type Props = React.HTMLAttributes<HTMLSpanElement>;

const ErrorMessage: React.FC<Props> = (props) => {
	if (!props.children) return null;

	return (
		<span className={cn("text-xs text-red-500", props.className)}>
			{props.children}
		</span>
	);
};

export default ErrorMessage;
