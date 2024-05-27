"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import React from "react";

const ActivitiesRatedCard = () => {
	const [status, setStatus] = React.useState<"rated" | "unrated">("rated");
	return (
		<div className="col-span-2 rounded-xl bg-white px-4 py-8">
			<h2 className="text-nowrap text-lg font-bold">Activities rated</h2>

			<Table className="mt-12">
				<TableHeader className="bg-white">
					<TableRow className="border-none">
						<TableHead className="flex items-center gap-4">
							<span>Activities</span>
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
									<SelectItem
										value={"questionnaire"}
										className="cursor-pointer"
									>
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
						</TableHead>
						<TableHead className="text-center">Total ratings</TableHead>
						<TableHead className="text-center">Average ratings</TableHead>
						<TableHead className="flex items-center justify-end gap-4">
							<span>Status</span>
							<Select value={status} onValueChange={(v) => setStatus(v as any)}>
								<SelectTrigger className="max-w-32">
									<SelectValue
										className="placeholder:text-neutral-500"
										placeholder="Choose a status"
									/>
								</SelectTrigger>
								<SelectContent className="max-w-sm">
									<SelectItem value={"rated"} className="cursor-pointer">
										Rated
									</SelectItem>
									<SelectItem value={"unrated"} className="cursor-pointer">
										Unrated
									</SelectItem>
								</SelectContent>
							</Select>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((x, i) => (
						<TableRow key={`activity-${i}`}>
							<TableCell className="flex items-center gap-4">
								<span>{x.activity}</span>
							</TableCell>
							<TableCell className="text-center">{x.total_ratings}</TableCell>
							<TableCell className="text-center">{x.average_ratings}</TableCell>
							<TableCell className="flex items-center justify-end gap-4">
								{status === "rated" ? (
									<span>{x.rated_status} %</span>
								) : (
									<span>{x.unrated_status} %</span>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

const data = [
	{
		activity: "Health",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
		unrated_status: 25,
	},
	{
		activity: "Lifestyle",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
		unrated_status: 25,
	},
	{
		activity: "Migration",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
		unrated_status: 25,
	},
	{
		activity: "Relationship",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
		unrated_status: 25,
	},
	{
		activity: "Home",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
		unrated_status: 25,
	},
	{
		activity: "Health",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
		unrated_status: 25,
	},
];

export default ActivitiesRatedCard;
