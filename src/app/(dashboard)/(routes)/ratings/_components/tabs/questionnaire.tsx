import React from "react";

import { useToken } from "@/components/providers/token";
import { useQuery } from "@tanstack/react-query";
import { ratingService } from "@/services/rating";
import ErrorScreen from "@/components/sections/error";

import RatingStatusCard from "../rating_status_card";
import TotalAverageRatingCard from "../total_average_rating_card";
import RatingDistributionCard from "../rating_distribution_card";
import GeographicalDistributionCard from "../geographical_distribution_card";
import ActivitiesRatedCard from "../activities_rated_card";

const QuestionnaireRatingsTab = () => {
	const { token } = useToken();

	const { data, isPending, error, refetch } = useQuery({
		queryKey: ["Rating Overview", { type: "q" }],
		queryFn: () => ratingService.getOverview("q", token || ""),
		enabled: !!token,
	});

	if (isPending) return <div className="p-4">Loading...</div>;

	if (error) return <ErrorScreen error={error} reset={refetch} />;

	return (
		<>
			<section className="mt-12 grid grid-cols-2 gap-6 px-6">
				<RatingStatusCard
					total={data?.data?.ratingsStatus?.total || 0}
					rated_status={parseFloat(
						data.data?.ratingsStatus?.ratedActivities || "0"
					)}
					unrated_status={parseFloat(
						data.data?.ratingsStatus?.unratedActivities || "0"
					)}
				/>
				<TotalAverageRatingCard
					average_rating={
						data.data?.totalAverageRatings &&
						data?.data?.totalAverageRatings !== "NaN"
							? data?.data?.totalAverageRatings
							: "0.0"
					}
				/>
			</section>

			<section className="mt-6 grid grid-cols-5 gap-6 px-6">
				<RatingDistributionCard data={data.data?.ratingDistributions} />
				<GeographicalDistributionCard data={data.data?.geoDistribution} />
			</section>

			<section className="mb-12 mt-6 grid grid-cols-1 px-6">
				<ActivitiesRatedCard
					type="questionnaire"
					data={data.data?.activitiesRated}
				/>
			</section>
		</>
	);
};

export default QuestionnaireRatingsTab;
