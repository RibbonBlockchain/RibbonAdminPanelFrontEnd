"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleUserReportIconSvg from "@/components/svgs/single_user_report_icon";
import { useRouter } from "next/navigation";
import { useToken } from "@/components/providers/token";
import QuestionnairesTab from "./questionnaires_tab";
import SurveysTab from "./surveys_tab";
import TasksTab from "./tasks_tab";

type Props = {
	view: string;
};

const SingleUserReportPage: React.FC<Props> = (props) => {
	const router = useRouter();
	const { token } = useToken();

	function handleTabChange(tab: "questionnaires" | "surveys" | "tasks") {
		const url = new URL(window.location.href);

		url.searchParams.set("view", tab);

		router.push(url.href);
	}

	return (
		<section className="mb-12 border px-4">
			<div className="flex w-full flex-col rounded-md bg-white p-4 shadow">
				<div className="flex w-full justify-between rounded-lg bg-primary/10 p-4">
					<figure className="flex w-full items-center gap-2">
						<SingleUserReportIconSvg />
						<figcaption>User Rb 01</figcaption>
					</figure>
					<div className="flex w-full flex-col">
						<span className="text-xs opacity-60">Location</span>
						<span className="text-xl">U.S.A</span>
					</div>
					<div className="flex w-full flex-col">
						<span className="text-xs opacity-60">SES Score</span>
						<span className="text-xl">75</span>
					</div>
					<div className="flex w-full flex-col">
						<span className="text-xs opacity-60">Average ratings</span>
						<span className="text-xl">4.5</span>
					</div>
					<div className="flex w-full flex-col">
						<span className="text-xs opacity-60">Total rewards earned</span>
						<span className="text-xl">55 wld</span>
					</div>
				</div>

				<Tabs defaultValue="reward" value={props.view} className="mt-12 w-full">
					<TabsList className="w-full justify-start gap-x-6 bg-transparent">
						<TabsTrigger
							onClick={() => handleTabChange("questionnaires")}
							value="questionnaires"
						>
							Questionnaires
						</TabsTrigger>
						<TabsTrigger
							onClick={() => handleTabChange("surveys")}
							value="surveys"
						>
							Surveys
						</TabsTrigger>
						<TabsTrigger onClick={() => handleTabChange("tasks")} value="tasks">
							Tasks
						</TabsTrigger>
					</TabsList>
					<TabsContent value="questionnaires" className="my-12">
						<QuestionnairesTab />
					</TabsContent>
					<TabsContent value="surveys" className="my-12">
						<SurveysTab />
					</TabsContent>
					<TabsContent value="tasks" className="my-12">
						<TasksTab />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

export default SingleUserReportPage;
