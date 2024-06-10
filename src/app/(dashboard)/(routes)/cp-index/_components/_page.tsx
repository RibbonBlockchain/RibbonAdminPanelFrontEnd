"use client";

import React from "react";
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
import { Button } from "@/components/ui/button";
import FileSvg from "@/components/svgs/file";
import HistorySvg from "@/components/svgs/history";

type Props = {};

const months_header = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const CPIndexPage: React.FC<Props> = (props) => {
	const [year, setYear] = React.useState(new Date().getFullYear());
	return (
		<>
			<div className="mx-4 grid grid-cols-5 gap-0.5">
				<div className="col-span-2">
					<Table>
						<TableHeader className="bg-primary-500">
							<TableRow className="border-none ">
								<TableHead className="h-14 text-center text-white"></TableHead>
								<TableHead className="text-center text-white">
									Time Period
								</TableHead>
								<TableHead className="flex items-center justify-end gap-4 text-white">
									<Select
										value={`${year}`}
										onValueChange={(v) => setYear(v as any)}
									>
										<SelectTrigger className="mt-2 h-full max-w-32 bg-transparent text-white">
											<SelectValue
												className="placeholder:text-neutral-500"
												placeholder="Choose a status"
											/>
										</SelectTrigger>
										<SelectContent className="max-w-sm">
											<SelectItem value={"2024"} className="cursor-pointer">
												2024
											</SelectItem>
											<SelectItem value={"2023"} className="cursor-pointer">
												2023
											</SelectItem>
										</SelectContent>
									</Select>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="bg-white">
							<TableRow className="font-semibold">
								<TableCell className="text-center">Country</TableCell>
								<TableCell className="text-center">Avg. CP Index</TableCell>
								<TableCell className="text-center">Current CP Index</TableCell>
							</TableRow>
							{data.map((x, i) => (
								<TableRow key={`countries-sub-header-${i}`}>
									<TableCell className="text-center">
										<span>{x.activity}</span>
									</TableCell>
									<TableCell className="text-center">
										{x.total_ratings}
									</TableCell>
									<TableCell className="text-center">
										{x.average_ratings}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<div className="col-span-3">
					<Table>
						<TableHeader className="bg-primary-500">
							<TableRow className="border-none ">
								{months_header.map((x, i) => (
									<TableHead
										key={`month-header-${i}`}
										className="h-14 text-center text-white"
									>
										{x}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow className="font-semibold">
								{Array.from({ length: months_header.length }, (_, i) => (
									<TableCell
										key={`empty-month-header-${i}`}
										className="border border-l-0 border-primary/20 text-center"
									>
										<span aria-hidden className="opacity-0">
											{months_header[i]}
										</span>
									</TableCell>
								))}
							</TableRow>
							{months_data.map((x, i) => (
								<TableRow key={`country-cpi-${i}`}>
									<TableCell className="border border-l-0 border-primary/20 text-center">
										<span>{x.january}</span>
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.february}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.march}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.april}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.may}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.june}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.july}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.august}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.september}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.october}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.november}
									</TableCell>
									<TableCell className="border border-primary/20 text-center">
										{x.december}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			<div className="ml-4 mr-12 mt-12 flex justify-end gap-4">
				<Button
					variant={"outline"}
					className="items-center gap-2 [&>svg>path]:hover:fill-white"
				>
					<span>View history</span> <HistorySvg />{" "}
				</Button>
				<Button className="items-center gap-2 [&>svg>path]:hover:stroke-primary">
					<span>Upload a file</span>
					<FileSvg />
				</Button>
			</div>
		</>
	);
};

const data = [
	{
		activity: "Health",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
	},
	{
		activity: "Lifestyle",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
	},
	{
		activity: "Migration",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
	},
	{
		activity: "Relationship",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
	},
	{
		activity: "Home",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
	},
	{
		activity: "Health",
		total_ratings: 100,
		average_ratings: 4.5,
		rated_status: 75,
	},
];

const months_data = [
	{
		january: 148,
		february: 148,
		march: 148,
		april: 148,
		may: 148,
		june: 148,
		july: 148,
		august: 148,
		september: 148,
		october: 148,
		november: 148,
		december: 148,
	},
	{
		january: 148,
		february: 148,
		march: 148,
		april: 148,
		may: 148,
		june: 148,
		july: 148,
		august: 148,
		september: 148,
		october: 148,
		november: 148,
		december: 148,
	},
	{
		january: 148,
		february: 148,
		march: 148,
		april: 148,
		may: 148,
		june: 148,
		july: 148,
		august: 148,
		september: 148,
		october: 148,
		november: 148,
		december: 148,
	},
	{
		january: 148,
		february: 148,
		march: 148,
		april: 148,
		may: 148,
		june: 148,
		july: 148,
		august: 148,
		september: 148,
		october: 148,
		november: 148,
		december: 148,
	},
	{
		january: 148,
		february: 148,
		march: 148,
		april: 148,
		may: 148,
		june: 148,
		july: 148,
		august: 148,
		september: 148,
		october: 148,
		november: 148,
		december: 148,
	},
	{
		january: 148,
		february: 148,
		march: 148,
		april: 148,
		may: 148,
		june: 148,
		july: 148,
		august: 148,
		september: 148,
		october: 148,
		november: 148,
		december: 148,
	},
];

export default CPIndexPage;
