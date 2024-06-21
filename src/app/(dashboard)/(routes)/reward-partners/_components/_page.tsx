"use client";

import React from "react";
import Image from "next/image";
import urls from "@/lib/urls";
import { ButtonLink } from "@/components/ui/button_link";
import { cn, formatCurrency } from "@/lib/utils";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { useToken } from "@/components/providers/token";
import { rewardPartnerService } from "@/services/reward_partner";
import { useQuery } from "@tanstack/react-query";
import PaginateSection from "@/components/sections/paginate_section";
import ErrorScreen from "@/components/sections/error";

type Props = {
	searchParams: {
		q?: string;
		page?: string;
		pageSize?: string;
	};
};

const RewardPartnerPage: React.FC<Props> = (props) => {
	const { token } = useToken();

	const { data, isPending, error, refetch } = useQuery({
		queryKey: ["reward partners", props.searchParams],
		queryFn: () => rewardPartnerService.getAll(props.searchParams, token || ""),
		enabled: !!token,
	});

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
							<TableHead>volume</TableHead>
							<TableHead>1 day</TableHead>
							<TableHead>1 week</TableHead>
							<TableHead>1 month</TableHead>
							<TableHead>total value</TableHead>
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
									<TableCell
										className={cn(
											program.value > 0 ? "text-green-500" : "text-red-500"
										)}
									>
										{formatCurrency(program.value, { currency: "USD" })}
									</TableCell>
									<TableCell
										className={cn(
											program.value > 0 ? "text-green-500" : "text-red-500"
										)}
									>
										{formatCurrency(program.value, { currency: "USD" })}
									</TableCell>
									<TableCell
										className={cn(
											program.value > 0 ? "text-green-500" : "text-red-500"
										)}
									>
										{formatCurrency(program.value, { currency: "USD" })}
									</TableCell>
									<TableCell className="flex flex-col">
										<span>
											{formatCurrency(program.value, { currency: "USD" })}{" "}
											<span className="lowercase">{program.token}</span>
										</span>
										<span className="text-black-neutral">
											≈ ${formatCurrency(program.value, { currency: "USD" })}
										</span>
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
