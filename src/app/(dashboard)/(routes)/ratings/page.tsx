import type { Metadata } from "next";

import Header from "@/components/header";
import RatingStatusCard from "./_components/rating_status_card";
import TotalAverageRatingCard from "./_components/total_average_rating_card";
import RatingDistributionCard from "./_components/rating_distribution_card";
import GeographicalDistributionCard from "./_components/geographical_distribution_card";
import ActivitiesRatedCard from "./_components/activities_rated_card";

export const metadata: Metadata = {
	title: "Ratings Overview",
	description: "Ratings Overview",
};

export default async function Page({
	searchParams,
}: {
	searchParams: { q?: string; page?: string; pageSize?: string };
}) {
	return (
		<>
			<Header>Admin Dashboard</Header>

			<h2 className="mt-12 text-center text-2xl font-semibold">
				User Ratings Overview
			</h2>

			<section className="mt-12 grid grid-cols-2 gap-6 px-6">
				<RatingStatusCard rated_status={80} unrated_status={20} />
				<TotalAverageRatingCard rated_status={80} unrated_status={20} />
			</section>

			<section className="mt-6 grid grid-cols-5 gap-6 px-6">
				<RatingDistributionCard />
				<GeographicalDistributionCard />
			</section>

			<section className="mb-12 mt-6 px-6">
				<ActivitiesRatedCard />
			</section>
		</>
	);
}
