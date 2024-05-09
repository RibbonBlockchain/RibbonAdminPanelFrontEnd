import Header from "@/components/header";

import type { Metadata } from "next";
import HomePage from "./_components/_page";

export const metadata: Metadata = {
	title: "Home",
	description: "Home",
};

export default function Home() {
	return (
		<>
			<Header>Overview</Header>
			<HomePage />
		</>
	);
}
