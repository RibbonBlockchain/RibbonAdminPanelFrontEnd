"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RewardTab from "./reward";
import UserTab from "./user";
import ActivityTab from "./activity";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@/lib/utils";
import { reportService } from "@/services/reports";
import { useToken } from "@/components/providers/token";
import { toast } from "@/components/ui/use-toast";
import { ImSpinner3 } from "react-icons/im";
import { spawn } from "child_process";
import { FaArrowUp } from "react-icons/fa6";

type Props = {
	view: string;
};

const ReportPage: React.FC<Props> = (props) => {
	const router = useRouter();
	const { token } = useToken();

	const { mutate, isPending } = useMutation({
		mutationKey: ["Export full system report"],
		mutationFn: () => reportService.downloadSystemReport(token || ""),
		onSuccess(data) {
			toast({
				title: "Success",
				description: data.message,
				duration: 5000,
			});
		},
		onError(error) {
			toast({
				title: "Error",
				description: getErrorMessage(error),
				duration: 5000,
				variant: "destructive",
			});
		},
	});

	function handleTabChange(
		tab: "reward" | "users" | "activities" | "notifications"
	) {
		const url = new URL(window.location.href);

		url.searchParams.set("view", tab);

		router.push(url.href);
	}

	return (
		<>
			<div className="my-12 flex flex-col items-center">
				<h2 className="text-center text-2xl font-semibold">
					Export report analysis
				</h2>
				<p className="mt-1 text-center text-sm">
					Select a report type and export report analysis
				</p>
				<Button
					disabled={isPending}
					variant={"outline"}
					className="mt-8 w-full max-w-64 text-base"
					onClick={() => mutate()}
				>
					{isPending ? (
						<span className="flex items-center">
							<ImSpinner3 className="mr-2 animate-spin" /> Exporting
						</span>
					) : (
						<span className="flex items-center gap-2">
							Export full system report <FaArrowUp />
						</span>
					)}
				</Button>
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
