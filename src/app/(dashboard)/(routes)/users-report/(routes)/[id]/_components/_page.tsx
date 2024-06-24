"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleUserReportIconSvg from "@/components/svgs/single_user_report_icon";
import { useRouter } from "next/navigation";
import { useToken } from "@/components/providers/token";
import QuestionnairesTab from "./questionnaires_tab";
import SurveysTab from "./surveys_tab";
import TasksTab from "./tasks_tab";
import { useQueries } from "@tanstack/react-query";
import { usersReportService } from "@/services/users_report";
import ErrorScreen from "@/components/sections/error";

type Props = {
	params: { id: string };
	view: string;
};

const SingleUserReportPage: React.FC<Props> = (props) => {
	const router = useRouter();
	const { token } = useToken();

	const [
		{
			data: questionnairesData,
			isPending: questionnairesIsPending,
			error: questionnairesError,
			refetch: questionnairesRefetch,
		},
		{
			data: surveysData,
			isPending: surveysIsPending,
			error: surveysError,
			refetch: surveysRefetch,
		},
		{
			data: tasksData,
			isPending: tasksIsPending,
			error: tasksError,
			refetch: tasksRefetch,
		},
	] = useQueries({
		queries: [
			{
				queryKey: ["users report activities questionnaires", props.params],
				queryFn: () =>
					usersReportService.getUsersActivitiesQuestionnaires(
						props.params.id,
						token || ""
					),
				enabled: !!token && props.view === "questionnaires",
			},
			{
				queryKey: ["users report activities surveys", props.params],
				queryFn: () =>
					usersReportService.getUsersActivitiesSurveys(
						props.params.id,
						token || ""
					),
				enabled: !!token && props.view === "surveys",
			},
			{
				queryKey: ["users report activities tasks", props.params],
				queryFn: () =>
					usersReportService.getUsersActivitiesTasks(
						props.params.id,
						token || ""
					),
				enabled: !!token && props.view === "tasks",
			},
		],
	});

	function handleTabChange(tab: "questionnaires" | "surveys" | "tasks") {
		const url = new URL(window.location.href);

		url.searchParams.set("view", tab);

		router.push(url.href);
	}

	if (
		questionnairesIsPending &&
		props.view !== "surveys" &&
		props.view !== "tasks"
	) {
		return <div className="px-4">Loading...</div>;
	}

	if (surveysIsPending && props.view === "surveys") {
		return <div className="px-4">Loading...</div>;
	}

	if (tasksIsPending && props.view === "tasks") {
		return <div className="px-4">Loading...</div>;
	}

	if (
		questionnairesError &&
		props.view !== "surveys" &&
		props.view !== "tasks"
	) {
		return (
			<ErrorScreen error={questionnairesError} reset={questionnairesRefetch} />
		);
	}

	if (surveysError && props.view === "surveys") {
		return <ErrorScreen error={surveysError} reset={surveysRefetch} />;
	}

	if (tasksError && props.view === "tasks") {
		return <ErrorScreen error={tasksError} reset={tasksRefetch} />;
	}

	return (
		<section className="mb-12 border px-4">
			<div className="flex w-full flex-col rounded-md bg-white p-4 shadow">
				<div className="flex w-full justify-between rounded-lg bg-primary/10 p-4">
					<figure className="flex w-full items-center gap-2">
						<SingleUserReportIconSvg />
						<figcaption>{questionnairesData?.data?.user.id}</figcaption>
					</figure>
					<div className="flex w-full flex-col">
						<span className="text-xs opacity-60">Location</span>
						<span className="text-xl">
							{questionnairesData?.data?.user.location || "N/A"}
						</span>
					</div>
					<div className="flex w-full flex-col">
						<span className="text-xs opacity-60">SES Score</span>
						<span className="text-xl">
							{questionnairesData?.data?.user.ses}
						</span>
					</div>
					<div className="flex w-full flex-col">
						<span className="text-xs opacity-60">Average ratings</span>
						<span className="text-xl">
							{questionnairesData?.data?.user.rating}
						</span>
					</div>
					<div className="flex w-full flex-col">
						<span className="text-xs opacity-60">Total rewards earned</span>
						<span className="text-xl">
							{questionnairesData?.data?.user.totalReward}
						</span>
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
						<QuestionnairesTab data={questionnairesData?.data?.data} />
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
