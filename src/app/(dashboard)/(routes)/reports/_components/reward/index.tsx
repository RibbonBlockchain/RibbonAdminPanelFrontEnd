import React from "react";
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

const RewardTab = () => {
	return (
		<>
			<section className="w-full rounded-2xl bg-white p-8 shadow-sm lg:p-16">
				<div className="grid grid-cols-7 gap-6 divide-x">
					<div className="col-span-7 space-y-2">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-bold">Reward Summary</h2>
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
						<RewardChart />
					</div>
				</div>

				<div className="mt-12">
					<div className="flex items-center gap-6">
						<h2 className="text-lg font-bold">Monthly Reward Summary</h2>
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
						<RewardMaxTokenChart total_tokens={100} />
						<RewardPaidOutChart
							total_tokens={100}
							paid_out={60}
							month="April"
						/>
					</div>
				</div>
			</section>

			<Button className="float-right my-12">Export report</Button>
		</>
	);
};

export default RewardTab;
