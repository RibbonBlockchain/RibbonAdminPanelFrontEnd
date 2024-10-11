import Header from "@/components/header";
import type { Metadata } from "next";
import ReceipientsForm from "./components/_page";

export const metadata: Metadata = {
	title: "Mass Payments",
	description: "Mass Payments",
};

export default function Page() {
	return (
		<>
			<Header>Mass Payments</Header>
			<ReceipientsForm />
		</>
	);
}
