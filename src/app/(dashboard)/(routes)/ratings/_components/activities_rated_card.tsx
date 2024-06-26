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

type Props = {
	type: "questionnaire" | "survey" | "task";
	data?: {
		activity: string;
		total: number;
		sum: number;
		average: number;
		status: string;
	}[];
};

const ActivitiesRatedCard: React.FC<Props> = (props) => {
	const [status, setStatus] = React.useState<"rated" | "unrated">("rated");
	return (
		<div className="col-span-2 min-h-96 rounded-xl bg-white px-4 py-8 shadow ">
			<h2 className="text-nowrap text-lg font-bold">Activities rated</h2>

			{props.data && props.data.length > 0 ? (
				<Table className="mt-12">
					<TableHeader className="bg-white">
						<TableRow className="border-none">
							<TableHead className="capitalize">{props.type}</TableHead>
							<TableHead className="text-center">Total ratings</TableHead>
							<TableHead className="text-center">Average ratings</TableHead>
							<TableHead className="flex items-center justify-end gap-4">
								<span>Status</span>
								<Select
									value={status}
									onValueChange={(v) => setStatus(v as any)}
								>
									{/* TODO: make visible ones backend returns both rated and unrated */}
									<SelectTrigger className="hidden max-w-32">
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
						{props.data.map((x, i) => (
							<TableRow key={`activity-${i}`}>
								<TableCell className="flex items-center gap-4">
									<span>{x.activity}</span>
								</TableCell>
								<TableCell className="text-center">{x.total}</TableCell>
								<TableCell className="text-center">{x.average}</TableCell>
								<TableCell className="flex items-center justify-end gap-4">
									{status === "rated" ? (
										<span>{x.status}</span>
									) : (
										<span>{x.status}</span>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<div className="flex h-full items-center justify-center text-center">
					No data available
				</div>
			)}
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
