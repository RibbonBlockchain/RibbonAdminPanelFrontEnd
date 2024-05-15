import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ActivitySummaryBarChart from "./summary_bar_chart";
import ActivityMonthlyOverviewChart from "./monthly_overview_chart";
import ActivityGeneralOverviewChart from "./general_overview_chart";

const ActivityTab = () => {
	return (
		<>
			<section className="w-full rounded-2xl bg-white p-8 shadow-sm lg:p-16">
				<div className="grid grid-cols-1">
					<div>
						<ActivitySummaryBarChart />
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
							<ActivityMonthlyOverviewChart
								completed_responses={60}
								incompleted_responses={20}
								average_completion_rate={57.14}
							/>
						</div>
						<div>
							<h3 className="mt-2 text-lg font-bold">General Overview</h3>
							<ActivityGeneralOverviewChart
								total_completed_responses={600}
								total_incompleted_responses={300}
								average_completion_rate={67}
							/>
						</div>
					</div>
				</div>
			</section>

			<Button className="float-right my-12">Export report</Button>
		</>
	);
};

export default ActivityTab;
