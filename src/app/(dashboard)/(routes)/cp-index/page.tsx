import Header from "@/components/header";

import type { Metadata } from "next";
import CPIndexPage from "./_components/_page";

export const metadata: Metadata = {
	title: "Reports",
	description: "Reports",
};

export default function Page({ searchParams }: { searchParams: {} }) {
	return (
		<>
			<Header />
			<div className="my-12 flex flex-col items-center">
				<h2 className="text-center text-2xl font-semibold">
					Consumer price indices (CPIs)
				</h2>
				<p className="mt-1 text-center text-sm">Consumer Price Index</p>

				<p>
					{new Date().toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
			</div>

			<CPIndexPage />
		</>
	);
}
