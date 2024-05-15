import React from "react";
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

const UserTab = () => {
	return (
		<>
			<section className="w-full rounded-2xl bg-white p-8 shadow-sm lg:p-16">
				<div className="grid grid-cols-1">
					<div>
						<UserSummaryBarChart />
					</div>
				</div>
				<div className="mt-12">
					<h2 className="text-base font-bold">Key Metrics</h2>
					<div className="mt-8 grid grid-cols-2 gap-12">
						<div>
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-bold">Monthly Overview</h3>
								<Select>
									<SelectTrigger className="max-w-32">
										<SelectValue
											className="placeholder:text-neutral-500"
											placeholder="Choose a month"
										/>
									</SelectTrigger>
									<SelectContent className="max-w-sm">
										<SelectItem value={"january"} className="cursor-pointer">
											January
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<UsersMonthlyOverviewChart
								active_users={60}
								inactive_users={20}
							/>
						</div>
						<div>
							<h3 className="mt-2 text-lg font-bold">General Overview</h3>
							<UsersGeneralOverviewChart
								total_active_users={600}
								total_inactive_users={300}
							/>
						</div>
					</div>
				</div>
			</section>

			<Button className="float-right my-12">Export report</Button>
		</>
	);
};

export default UserTab;
