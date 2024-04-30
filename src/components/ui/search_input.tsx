import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

type Props = {
	container_className?: string;
	input?: React.InputHTMLAttributes<HTMLInputElement>;
};

const SearchInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	return (
		<div className={cn("relative", props.container_className)}>
			<IoSearchOutline className="absolute left-2 top-1/2 -translate-y-1/2" />
			<Input
				{...props.input}
				ref={ref}
				type="search"
				className={cn("bg-transparent pl-8", props.input?.className)}
			/>
		</div>
	);
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
