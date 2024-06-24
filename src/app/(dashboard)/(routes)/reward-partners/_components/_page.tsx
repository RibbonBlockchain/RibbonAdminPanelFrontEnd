"use client";

import React from "react";
import Image from "next/image";
import urls from "@/lib/urls";
import { ButtonLink } from "@/components/ui/button_link";
import { cn, formatCurrency, formatDate, getMonthDayYear } from "@/lib/utils";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { useToken } from "@/components/providers/token";
import { rewardPartnerService } from "@/services/reward_partner";
import { useQuery } from "@tanstack/react-query";
import PaginateSection from "@/components/sections/paginate_section";
import ErrorScreen from "@/components/sections/error";
import { Button } from "@/components/ui/button";
import { RxCaretDown } from "react-icons/rx";
import { IoRemoveOutline } from "react-icons/io5";

type Props = {
	searchParams: {
		q?: string;
		page?: string;
		pageSize?: string;
	};
};

const RewardPartnerPage: React.FC<Props> = (props) => {
	const { token } = useToken();
	const [fromDate, setFromDate] = React.useState<Date | undefined>(new Date());
	const [toDate, setToDate] = React.useState<Date | undefined>(new Date());

	const { data, isPending, error, refetch } = useQuery({
		queryKey: ["reward partners", props.searchParams],
		queryFn: () => rewardPartnerService.getAll(props.searchParams, token || ""),
		enabled: !!token,
	});

	React.useEffect(() => {
		if (toDate! < fromDate!) setToDate(fromDate);
	}, [fromDate, toDate]);

	if (isPending) return <div className="p-4">Loading...</div>;

	if (error) return <ErrorScreen error={error} reset={refetch} />;

	return (
		<>
			<div className="mx-4 mt-12 flex flex-col gap-2 px-4">
				<span className="rounded-md font-medium drop-shadow-sm">
					Total Balance (Points)
				</span>
				<div className="rounded-md text-xl drop-shadow-sm">
					<span className="font-bold">
						{formatCurrency(data?.data?.totalBalance || 0, { currency: "USD" })}{" "}
						pts
					</span>
					<span className="text-black-neutral"> ≈ </span>
					<span className="text-black-neutral">
						${formatCurrency(124_326.91, { currency: "USD" })}
					</span>
				</div>
			</div>
			<section className="mx-4 my-12 gap-6">
				<Table>
					<TableHeader className="h-20 border-y border-black-neutral/20 bg-white">
						<TableRow className="uppercase">
							<TableHead>name</TableHead>
							<TableHead>balance</TableHead>
							<TableHead>total value</TableHead>
							<TableHead>
								<span className="text-sm capitalize">
									Filter points claimed by dates
								</span>
								<div className="mt-1 flex items-center gap-2">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"dropdown"}
												className={cn("border pl-3 text-left font-normal")}
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
												className={cn("border pl-3 text-left font-normal")}
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
							</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="[&_tr:nth-child(even)]:bg-white [&_tr:nth-child(odd)]:bg-transparent">
						{data?.data &&
							data?.data.data.map((program, index) => (
								<TableRow
									key={`program-${index}`}
									className="border-black-neutral/20 hover:bg-transparent"
								>
									<TableCell className="font-medium">
										<figure className="flex gap-x-2">
											<Image
												src={program.logo}
												alt=""
												width={40}
												height={40}
												className="size-10 object-cover object-center"
											/>
											<figcaption>
												<h2 className="text-base font-medium">
													{program.name}
												</h2>
												<span className="text-xs font-medium">
													{program.token}
												</span>
											</figcaption>
										</figure>
									</TableCell>
									<TableCell className="flex flex-col">
										<span>
											{formatCurrency(program.volume, { currency: "USD" })}
										</span>
										<span>pts</span>
									</TableCell>
									<TableCell>
										<div className="flex flex-col">
											<span>
												{formatCurrency(program.value, { currency: "USD" })}{" "}
												<span className="lowercase">{program.token}</span>
											</span>
											<span className="text-black-neutral">
												≈ ${formatCurrency(program.value, { currency: "USD" })}
											</span>
										</div>
									</TableCell>
									<TableCell
										className={cn(
											"flex flex-col",
											program.value > 0 ? "text-green-500" : "text-red-500"
										)}
									>
										<span>
											{formatCurrency(program.volume, { currency: "USD" })}
										</span>
										<span>pts</span>
									</TableCell>
									<TableCell>
										<ButtonLink
											href={urls.dashboard.reward_partners.single(
												program.id.toString()
											)}
										>
											Fund Program
										</ButtonLink>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</section>
			<PaginateSection
				current_page={data?.data?.pagination.currentPage || 0}
				total_pages={data?.data?.pagination.totalPages || 0}
				containerClass="pt-1"
			/>{" "}
		</>
	);
};

export default RewardPartnerPage;
