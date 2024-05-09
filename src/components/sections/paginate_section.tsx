"use client";

import React from "react";
import Paginator from "@/components/paginator";
import { useRouter, useSearchParams } from "next/navigation";

export type Props = {
	current_page: number;
	total_pages: number;
};

const PaginateSection: React.FC<Props> = (props) => {
	const searchParams = useSearchParams();
	const q = searchParams.get("q") || "";
	const router = useRouter();

	function handlePaginate(page: number) {
		const url = new URL(window.location.href);

		if (q) {
			url.searchParams.set("q", encodeURIComponent(q));
		}

		if (page > 0) {
			url.searchParams.set("page", page.toString());
		}

		router.push(url.href);
	}

	return (
		<div className="bg-custom-white-default py-12">
			<Paginator
				current_page={props.current_page || 1}
				total_pages={props.total_pages || 1}
				handlePaginate={handlePaginate}
			/>
		</div>
	);
};

export default PaginateSection;