"use client";

import SearchInput from "@/components/ui/search_input";
import { cn, debounce } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
	placeholder?: string;
	container_className?: string;
	form_className?: string;
};

const Search: React.FC<Props> = (props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const defaultValue = searchParams.get("q") || "";
	const status = searchParams.get("status") || "";

	const inputRef = React.useRef<HTMLInputElement>(null);
	function handleSearch() {
		if (!inputRef.current) return;

		const url = new URL(window.location.href);

		url.searchParams.set(
			"q",
			encodeURIComponent(inputRef.current.value.trim())
		);

		if (status) {
			url.searchParams.set("status", status);
		}

		router.push(url.href);
	}

	const debouncedSearch = debounce(handleSearch);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSearch();
			}}
			className={cn("w-full", props.form_className)}
		>
			<SearchInput
				ref={inputRef}
				input={{
					defaultValue: defaultValue,
					placeholder: props.placeholder || "Search",
					onChange: debouncedSearch,
				}}
				container_className={cn(
					"w-full max-w-xs ml-3",
					props.container_className
				)}
			/>
		</form>
	);
};

export default Search;
