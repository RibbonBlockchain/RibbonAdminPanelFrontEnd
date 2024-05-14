import Header from "@/components/header";
import { Metadata } from "next";
import RewardPartnerPage from "./_components/_page";

export const metadata: Metadata = {
	title: "Reward Partners",
};

export default function RewardPoints({
	searchParams,
}: {
	searchParams: { q?: string; page?: string; pageSize?: string };
}) {
	return (
		<>
			<Header>Reward Partners</Header>
			<RewardPartnerPage searchParams={searchParams} />
		</>
	);
}
