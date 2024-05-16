import Header from "@/components/header";

import type { Metadata } from "next";
import ReportPage from "./_components/_page";

export const metadata: Metadata = {
	title: "Reports",
	description: "Reports",
};

export default function Page({
	searchParams,
}: {
	searchParams: { view?: string };
}) {
	return (
		<>
			<Header>Reports</Header>
			<ReportPage
				view={
					["reward", "users", "activities", "notifications"].includes(
						searchParams.view || ""
					)
						? (searchParams.view as string)
						: "reward"
				}
			/>
		</>
	);
}
