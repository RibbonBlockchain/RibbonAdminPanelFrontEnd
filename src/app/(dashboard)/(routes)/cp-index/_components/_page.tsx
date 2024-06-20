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

import HistorySvg from "@/components/svgs/history";
import { useToken } from "@/components/providers/token";
import { useQuery } from "@tanstack/react-query";
import { cpIndexService } from "@/services/cp_index";
import ErrorScreen from "@/components/sections/error";
import { ButtonLink } from "@/components/ui/button_link";
import urls from "@/lib/urls";
import UploadCpIndexModal from "./upload_cpindex_modal";

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
	const { token } = useToken();
	const [year, setYear] = React.useState(new Date().getFullYear());

	const {
		data: cpiData,
		isPending,
		error,
		refetch,
	} = useQuery({
		queryKey: ["cp-index", { year }],
		queryFn: () => cpIndexService.getAll(year, token || ""),
		enabled: !!token && !!year,
	});

	if (isPending) return <p className="px-4">Loading...</p>;

	if (error) return <ErrorScreen error={error} reset={refetch} />;

	if (!cpiData.data || cpiData.data?.length < 1)
		return <p className="px-4">No data</p>;

	return (
		<>
			<div className="mx-4 grid grid-cols-5 gap-0.5">
				<div className="col-span-2">
					<Table>
						<TableHeader className="bg-primary-500">
							<TableRow className="border-none ">
								<TableHead className="text-center text-white">
									<span className="flex h-14 items-center"></span>
								</TableHead>
								<TableHead className="text-center text-white">
									<span className="flex h-14 items-center">Time Period</span>
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
								<TableCell className="p-0">
									<span className="flex h-14 w-full items-center justify-center">
										Country
									</span>
								</TableCell>
								<TableCell className="p-0">
									<span className="flex h-14 w-full items-center justify-center text-center">
										Avg. CP Index
									</span>
								</TableCell>
								<TableCell className="p-0">
									<span className="flex h-14 w-full items-center justify-center text-center">
										Current CP Index
									</span>
								</TableCell>
							</TableRow>
							{cpiData.data.map((x, i) => (
								<TableRow key={`countries-sub-header-${i}`} className="h-10">
									<TableCell className="p-0">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.country}
										</span>
									</TableCell>
									<TableCell className="p-0">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.averageCPI}
										</span>
									</TableCell>
									<TableCell className="p-0">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.currentCPI}
										</span>
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
										className="text-center text-white "
									>
										<span className="flex h-14 items-center">{x}</span>
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow className="font-semibold">
								{Array.from({ length: months_header.length }, (_, i) => (
									<TableCell
										key={`empty-month-header-${i}`}
										className="border border-l-0 border-primary/20 p-0 text-center"
									>
										<span aria-hidden className="flex h-14 opacity-0">
											{months_header[i]}
										</span>
									</TableCell>
								))}
							</TableRow>
							{cpiData.data.map((x, i) => (
								<TableRow key={`country-cpi-${i}`}>
									<TableCell className="border border-l-0 border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											<span>{x.january}</span>
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.february}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.march}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.april}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.may}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.june}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.july}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.august}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.september}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.october}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.november}
										</span>
									</TableCell>
									<TableCell className="border border-primary/20 p-0 text-center">
										<span className="flex h-14 w-full items-center justify-center text-center">
											{x.december}
										</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			<div className="my-12 ml-4 mr-12 flex justify-end gap-4">
				<ButtonLink
					href={urls.dashboard.cp_index["upload-history"]}
					variant={"outline"}
					className="items-center gap-2 [&>svg>path]:hover:fill-white"
				>
					<span>View history</span> <HistorySvg />{" "}
				</ButtonLink>

				<UploadCpIndexModal />
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
