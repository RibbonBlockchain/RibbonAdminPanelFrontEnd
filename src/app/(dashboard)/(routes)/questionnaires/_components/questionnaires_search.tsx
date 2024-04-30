"use client";

import SearchInput from "@/components/ui/search_input";
import urls from "@/lib/urls";
import { debounce } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const QuestionnairesSearch = () => {
	const router = useRouter();
	const inputRef = React.useRef<HTMLInputElement>(null);
	function handleSearch() {
		if (inputRef.current) {
			router.push(
				urls.dashboard.questionnaires.index.concat(
					inputRef.current.value.trim()
						? `?q=${encodeURIComponent(inputRef.current.value.trim())}`
						: ""
				)
			);
		}
	}

	const debouncedSearch = debounce(handleSearch);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSearch();
			}}
			className="w-full"
		>
			<SearchInput
				ref={inputRef}
				input={{
					placeholder: "Search Questionnaires",
					onChange: debouncedSearch,
				}}
				container_className="w-full max-w-xs ml-3"
			/>
		</form>
	);
};

export default QuestionnairesSearch;
