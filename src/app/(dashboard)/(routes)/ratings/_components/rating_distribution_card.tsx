import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

const RatingDistributionCard = () => {
	return (
		<div className="col-span-3 rounded-xl bg-white px-4 py-8">
			<div className="flex justify-between gap-6">
				<h2 className="text-nowrap text-lg font-bold">Ratings distributions</h2>

				<Select
				// value={}
				// onValueChange={(v) => props.setReportToShow(v as any)}
				>
					<SelectTrigger className="max-w-32">
						<SelectValue
							className="placeholder:text-neutral-500"
							placeholder="Choose a month"
						/>
					</SelectTrigger>
					<SelectContent className="max-w-sm">
						<SelectItem value={"questionnaire"} className="cursor-pointer">
							Questionnaire
						</SelectItem>
						<SelectItem value={"survey"} className="cursor-pointer">
							Survey
						</SelectItem>
						<SelectItem value={"task"} className="cursor-pointer">
							Task
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<ul>
				{data.map((x, i) => (
					<li
						key={`rating-distribution-${i}`}
						className="flex justify-between border-b py-4"
					>
						<div className="relative flex flex-col gap-4">
							<span className="absolute -right-14 rounded-full bg-primary-50 px-1 py-0.5 text-xs font-semibold text-primary">
								{x.rating} %
							</span>
							<span className="text-sm font-semibold">
								{x.stars} star ratings
							</span>
							<span className="flex gap-1">
								{Array.from({ length: x.stars }, (_, i) => (
									<TiStarFullOutline
										key={`star-rating-${x.stars}-index-${i}`}
										className="text-golden"
									/>
								))}
							</span>
						</div>
						<div className="flex min-w-36 flex-col gap-5">
							<span className="text-sm font-semibold">{x.reviews} reviews</span>
							<span className="relative flex h-2 w-full rounded-full bg-primary-50">
								<span
									style={{ width: `${x.rating}%` }}
									className="absolute left-0 top-1/2 flex h-2 -translate-y-1/2 rounded-full bg-primary"
								/>
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

const data = [
	{
		stars: 5,
		reviews: 58,
		rating: 60.5,
	},
	{
		stars: 4,
		reviews: 15,
		rating: 50.5,
	},
	{
		stars: 3,
		reviews: 20,
		rating: 30.5,
	},
	{
		stars: 2,
		reviews: 10,
		rating: 20.5,
	},
	{
		stars: 1,
		reviews: 2,
		rating: 10.5,
	},
];

export default RatingDistributionCard;
