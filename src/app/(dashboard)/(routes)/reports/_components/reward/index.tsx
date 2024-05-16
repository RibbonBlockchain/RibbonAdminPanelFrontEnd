"use client";

import React, { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import RewardChart from "../../../(home)/_components/reward_chart";
import RewardMaxTokenChart from "./max_token_chart";
import RewardPaidOutChart from "./paid_out_chart";
import { Button } from "@/components/ui/button";
import { useToken } from "@/components/providers/token";
import { getCurrentMonth } from "@/lib/utils";
import { reportService } from "@/services/reports";
import { useQueries } from "@tanstack/react-query";
import { months } from "@/lib/constants";
import ErrorScreen from "@/components/sections/error";

function getMaxToken(
	data: {
		id: string;
		name: string;
		active: number;
		inactive: number;
	}[]
) {
	let max = 0;

	for (let i = 0; i < data?.length; i++) {
		if (data[i].active > max) {
			max = data[i].active;
		}
	}

	return max;
}

const RewardTab = () => {
	const { token } = useToken();

	const [month, setMonth] = useState(getCurrentMonth());

	const [{ data, isPending, error, refetch }] = useQueries({
		queries: [
			{
				queryKey: ["reward reports"],
				queryFn: () => reportService.getAllRewardReports(token || ""),
				enabled: !!token,
			},
		],
	});

	if (isPending) return <div className="p-4">Loading...</div>;

	if (error)
		return (
			<ErrorScreen
				error={error}
				reset={refetch}
				containerClass="min-h-[50vh]"
			/>
		);

	return (
		<>
			<section className="w-full rounded-2xl bg-white p-8 shadow-sm lg:p-16">
				<div className="grid grid-cols-7 gap-6 divide-x">
					<div className="col-span-7 space-y-2">
						<h2 className="mb-8 text-lg font-bold">Reward Summary</h2>
						<RewardChart data={data?.data?.data || []} />
					</div>
				</div>

				<div className="mt-12">
					<div className="flex items-center gap-6">
						<h2 className="text-lg font-bold">Monthly Reward Summary</h2>
						<Select value={month} onValueChange={setMonth}>
							<SelectTrigger className="max-w-32">
								<SelectValue
									className="placeholder:text-neutral-500"
									placeholder="Choose a month"
								/>
							</SelectTrigger>
							<SelectContent className="max-w-sm">
								{months.map((month) => (
									<SelectItem
										key={month.id}
										value={month.id}
										className="cursor-pointer"
									>
										{month.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="mt-8 space-y-2 text-black-neutral">
						<h3>Overview</h3>
						<p className="px-4">
							In April, we paid out a total of 80 WLD tokens as rewards to users
							in our rewards program. This report gives a detailed look at how
							we distributed these rewards, helping us understand how well our
							program is working and showing us where we can make improvements.
						</p>
					</div>
				</div>

				<div className="mt-12">
					<h2 className="text-lg font-bold">Key Metrics</h2>
					<div className="grid grid-cols-2 gap-6">
						<RewardMaxTokenChart
							total_tokens={getMaxToken(data?.data?.data || [])}
						/>
						<RewardPaidOutChart
							total_tokens={
								data?.data?.data?.filter(
									(r) => r.id.toLowerCase() === month.toLowerCase()
								)[0].active || 0
							}
							paid_out={
								data?.data?.data?.filter(
									(r) => r.id.toLowerCase() === month.toLowerCase()
								)[0].active || 0
							}
							month={months.filter((m) => m.id === month)[0].name}
						/>
					</div>
				</div>
			</section>

			<Button className="float-right my-12">Export report</Button>
		</>
	);
};

export default RewardTab;
