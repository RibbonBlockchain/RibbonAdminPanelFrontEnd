import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

type Props = {
	placeholder: string;
	container_className?: string;
	input_className?: string;
};

const SearchInput: React.FC<Props> = (props) => {
	return (
		<div className={cn("relative", props.container_className)}>
			<IoSearchOutline className="absolute left-2 top-1/2 -translate-y-1/2" />
			<Input
				type="search"
				placeholder={props.placeholder}
				className={cn("bg-transparent pl-8", props.input_className)}
			/>
		</div>
	);
};

export default SearchInput;
