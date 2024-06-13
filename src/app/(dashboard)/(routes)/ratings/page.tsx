import type { Metadata } from "next";

import Header from "@/components/header";
import RatingPage from "./_components/_page";

export const metadata: Metadata = {
	title: "Ratings Overview",
	description: "Ratings Overview",
};

export default async function Page({
	searchParams,
}: {
	searchParams: { type: "q" | "s" | "t" };
}) {
	return (
		<>
			<Header>Admin Dashboard</Header>

			<h2 className="mt-12 text-center text-2xl font-semibold">
				User Ratings Overview
			</h2>

			<RatingPage
				type={
					["q", "s", "t"].includes(searchParams.type) ? searchParams.type : "q"
				}
			/>
		</>
	);
}
