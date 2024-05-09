"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
	count: number;
	title: string;
	action_status: "ACTIVE" | "CLOSED";
};

const StatusToggler: React.FC<Props> = (props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const q = searchParams.get("q") || "";
	const status = searchParams.get("status") || "ACTIVE";

	function toggle(s: "ACTIVE" | "CLOSED") {
		if (status === s) return;

		const url = new URL(window.location.href);

		if (q) {
			url.searchParams.set("q", encodeURIComponent(q));
		}

		url.searchParams.set("status", s);

		router.replace(url.href);
	}
	return (
		<Button
			onClick={() => toggle(props.action_status)}
			variant={"plain"}
			className={cn("rounded-full border border-primary/20 text-primary", {
				"bg-primary/20": props.action_status === status,
			})}
		>
			{props.title} ({props.count})
		</Button>
	);
};

export default StatusToggler;
