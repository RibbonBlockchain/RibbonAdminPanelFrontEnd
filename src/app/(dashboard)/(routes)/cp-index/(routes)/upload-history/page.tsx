import Header from "@/components/header";

import type { Metadata } from "next";
import CpIndexUploadHistoryTable from "./_components/history_table";

export const metadata: Metadata = {
	title: "CP Index Upload History",
	description: "CP Index Upload History",
};

export default function Page({ searchParams }: { searchParams: {} }) {
	return (
		<>
			<Header />
			<div className="my-12 flex flex-col items-center">
				<h2 className="text-center text-2xl font-semibold">
					Consumer price indices (CPIs)
				</h2>
				<p className="mt-1 text-center text-sm">File Upload History</p>
			</div>

			<section className="mx-auto w-full max-w-3xl">
				<h3 className="mb-8 text-xl font-semibold">Upload History</h3>
				<CpIndexUploadHistoryTable />
			</section>
		</>
	);
}
