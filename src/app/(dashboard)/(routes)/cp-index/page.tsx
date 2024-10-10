import Header from "@/components/header";

import type { Metadata } from "next";
import CPIndexPage from "./_components/_page";

export const metadata: Metadata = {
	title: "CP Index",
	description: "CP Index",
};

export default function Page({ searchParams }: { searchParams: {} }) {
	return (
		<>
			<Header />
			<div className="my-12 flex flex-col items-center">
				<h2 className="text-center text-2xl font-semibold">
					Consumer Price Indexes (CPI)
				</h2>
			</div>

			<CPIndexPage />
		</>
	);
}
