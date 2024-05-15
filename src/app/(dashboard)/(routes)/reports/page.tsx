import Header from "@/components/header";

import type { Metadata } from "next";
import ReportPage from "./_components/_page";

export const metadata: Metadata = {
	title: "Reports",
	description: "Reports",
};

export default function Page() {
	return (
		<>
			<Header>Reports</Header>
			<ReportPage />
		</>
	);
}
