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
import { Calendar } from "@/components/ui/calendar";
import { cn, getMonthDayYear } from "@/lib/utils";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoRemoveOutline } from "react-icons/io5";
import { RxCaretDown } from "react-icons/rx";

const QuestionnaireRatingsTab = () => {
	const { token } = useToken();

	const today = new Date();
	const [fromDate, setFromDate] = React.useState<Date | undefined>(
		new Date(today.getTime() - 24 * 60 * 60 * 1000)
	);
	const [toDate, setToDate] = React.useState<Date | undefined>(today);

	const { data, isPending, error, refetch } = useQuery({
		queryKey: ["Rating Overview", { type: "q" }],
		queryFn: () => ratingService.getOverview("q", token || ""),
		enabled: !!token,
	});

	React.useEffect(() => {
		if (toDate! < fromDate!) setToDate(fromDate);
	}, [fromDate, toDate]);

	if (isPending) return <div className="p-4">Loading...</div>;

	if (error) return <ErrorScreen error={error} reset={refetch} />;

	return (
		<>
			<div className="mt-1 flex items-center justify-end gap-2 px-6">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"dropdown"}
							className={cn(
								"border border-neutral-300 pl-3 text-left font-normal"
							)}
						>
							{fromDate ? (
								getMonthDayYear(fromDate.toISOString())
							) : (
								<span>Pick a date</span>
							)}
							<RxCaretDown className="ml-2 text-lg" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="end">
						<Calendar
							mode="single"
							fromYear={2023}
							toYear={new Date().getFullYear()}
							captionLayout="dropdown"
							selected={fromDate}
							onSelect={setFromDate}
							disabled={(date: Date) =>
								date > new Date() || date < new Date("1900-01-01")
							}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
				<IoRemoveOutline />
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"dropdown"}
							className={cn(
								"border border-neutral-300 pl-3 text-left font-normal"
							)}
						>
							{toDate ? (
								getMonthDayYear(toDate.toISOString())
							) : (
								<span>Pick a date</span>
							)}
							<RxCaretDown className="ml-2 text-lg" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							fromYear={2023}
							toYear={new Date().getFullYear()}
							captionLayout="dropdown"
							selected={toDate}
							onSelect={setToDate}
							disabled={(date: Date) =>
								date > new Date() ||
								date < new Date("1900-01-01") ||
								!fromDate ||
								fromDate > date
							}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
			<section className="mt-6 grid grid-cols-2 gap-6 px-6">
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
