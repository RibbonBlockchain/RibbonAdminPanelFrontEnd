"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

type Props = {
	data?: {
		type: number;
		total: number;
		percentage: number;
	}[];
};

const RatingDistributionCard: React.FC<Props> = (props) => {
	return (
		<div className="col-span-3 min-h-96 rounded-xl bg-white px-4 py-8 shadow">
			<div className="flex justify-between gap-6">
				<h2 className="text-nowrap text-lg font-bold">Ratings distributions</h2>

				<Select
				// value={}
				// onValueChange={(v) => props.setReportToShow(v as any)}
				>
					<SelectTrigger className="hidden max-w-32">
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

			<ul className="h-full">
				{props.data && props.data.length > 0 ? (
					[...props.data]
						.sort((a, b) => b.type - a.type)
						.map((x, i) => (
							<li
								key={`rating-distribution-${i}`}
								className="flex justify-between border-b py-4"
							>
								<div className="relative flex flex-col gap-4">
									<span className="absolute -right-14 rounded-full bg-primary-50 px-1 py-0.5 text-xs font-semibold text-primary">
										{x.percentage} %
									</span>
									<span className="text-sm font-semibold">
										{x.type === 0
											? "Unrated ratings"
											: `${x.type} star ratings`}
									</span>
									<span className="flex gap-1">
										{Array.from({ length: x.type }, (_, i) => (
											<TiStarFullOutline
												key={`star-rating-${x.type}-index-${i}`}
												className="text-golden"
											/>
										))}
									</span>
								</div>
								<div className="flex min-w-36 flex-col gap-5">
									<span className="text-sm font-semibold">
										{x.type === 0 ? `${x.total} unrated` : `${x.total} reviews`}
									</span>
									<span className="relative flex h-2 w-full rounded-full bg-primary-50">
										<span
											style={{ width: `${x.total}%` }}
											className="absolute left-0 top-1/2 flex h-2 -translate-y-1/2 rounded-full bg-primary"
										/>
									</span>
								</div>
							</li>
						))
				) : (
					<li className="flex h-full items-center justify-center text-center">
						No data available
					</li>
				)}
			</ul>
		</div>
	);
};

export default RatingDistributionCard;
