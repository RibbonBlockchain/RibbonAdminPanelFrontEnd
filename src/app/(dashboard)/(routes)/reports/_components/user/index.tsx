"use client";

import React, { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import UserSummaryBarChart from "./summary_bar_chart";
import UsersMonthlyOverviewChart from "./monthly_overview_chart";
import UsersGeneralOverviewChart from "./general_overview_chart";
import { useQueries } from "@tanstack/react-query";
import { reportService } from "@/services/reports";
import { useToken } from "@/components/providers/token";
import { months } from "@/lib/constants";
import { getCurrentMonth } from "@/lib/utils";
import ErrorScreen from "@/components/sections/error";

const UserTab = () => {
	const { token } = useToken();

	const [month, setMonth] = useState(getCurrentMonth());

	const [{ data, isPending, error, refetch }] = useQueries({
		queries: [
			{
				queryKey: ["user reports"],
				queryFn: () => reportService.getAllUserReports(token || ""),
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
				<div className="grid grid-cols-1">
					<div>
						<UserSummaryBarChart data={data?.data?.data || []} />
					</div>
				</div>
				<div className="mt-12">
					<h2 className="text-base font-bold">Key Metrics</h2>
					<div className="mt-8 grid grid-cols-2 gap-12">
						<div>
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-bold">Monthly Overview</h3>
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
							<UsersMonthlyOverviewChart
								active_users={
									data?.data?.data.filter(
										(d) => d.id.toLowerCase() === month.toLowerCase()
									)[0].active || 0
								}
								inactive_users={
									data?.data?.data.filter(
										(d) => d.id.toLowerCase() === month.toLowerCase()
									)[0].inactive || 0
								}
							/>
						</div>
						<div>
							<h3 className="mt-2 text-lg font-bold">General Overview</h3>
							<UsersGeneralOverviewChart
								total_active_users={data?.data?.active || 0}
								total_inactive_users={data?.data?.inactive || 0}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* <Button className="float-right my-12">Export report</Button> */}
		</>
	);
};

export default UserTab;
