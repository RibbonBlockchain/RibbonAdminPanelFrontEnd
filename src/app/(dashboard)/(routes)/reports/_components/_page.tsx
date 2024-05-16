"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RewardTab from "./reward";
import UserTab from "./user";
import ActivityTab from "./activity";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
	view: string;
};

const ReportPage: React.FC<Props> = (props) => {
	const router = useRouter();

	function handleTabChange(
		tab: "reward" | "users" | "activities" | "notifications"
	) {
		const url = new URL(window.location.href);

		url.searchParams.set("view", tab);

		router.push(url.href);
	}

	return (
		<>
			<div className="my-12">
				<h2 className="text-center text-lg font-bold">
					Export report analysis
				</h2>
				<p className="text-center text-sm">
					Select a report type and export report analysis
				</p>
			</div>

			<Tabs
				defaultValue="reward"
				value={props.view}
				className="mx-auto w-full max-w-5xl px-4"
			>
				<TabsList className="w-full gap-x-6 bg-transparent ">
					<TabsTrigger onClick={() => handleTabChange("reward")} value="reward">
						Rewards Summary
					</TabsTrigger>
					<TabsTrigger onClick={() => handleTabChange("users")} value="users">
						Users Overview
					</TabsTrigger>
					<TabsTrigger
						onClick={() => handleTabChange("activities")}
						value="activities"
					>
						Activity Rate
					</TabsTrigger>
					{/* <TabsTrigger
						onClick={() => handleTabChange("notifications")}
						value="notifications"
					>
						Notifications Report
					</TabsTrigger> */}
				</TabsList>
				<TabsContent value="reward" className="my-12">
					<RewardTab />
				</TabsContent>
				<TabsContent value="users" className="my-12">
					<UserTab />
				</TabsContent>
				<TabsContent value="activities" className="my-12">
					<ActivityTab />
				</TabsContent>
				<TabsContent value="notifications" className="my-12">
					Notifications here.
				</TabsContent>
			</Tabs>
		</>
	);
};

export default ReportPage;
