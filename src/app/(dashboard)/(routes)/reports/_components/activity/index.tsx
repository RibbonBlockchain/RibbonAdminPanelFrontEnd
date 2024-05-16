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
import ActivitySummaryBarChart from "./summary_bar_chart";
import ActivityMonthlyOverviewChart from "./monthly_overview_chart";
import ActivityGeneralOverviewChart from "./general_overview_chart";
import { useToken } from "@/components/providers/token";
import { getCurrentMonth } from "@/lib/utils";
import { useQueries } from "@tanstack/react-query";
import { reportService } from "@/services/reports";
import { months } from "@/lib/constants";
import ErrorScreen from "@/components/sections/error";

function getMonthlyAverage(total: number, pending: number) {
	return ((total - pending) / total) * 100 || 0;
}

const ActivityTab = () => {
	const { token } = useToken();

	const [month, setMonth] = useState(getCurrentMonth());

	const [reportToShow, setReportToShow] = useState<
		"questionnaire" | "task" | "survey"
	>("questionnaire");

	const [
		{
			data: questionnaireData,
			isPending: isPendingQuestionnaire,
			error: questionnaireError,
			refetch: questionnaireRefetch,
		},
		{
			data: surveyData,
			isPending: isPendingSurvey,
			error: surveyError,
			refetch: surveyRefetch,
		},
		{
			data: taskData,
			isPending: isPendingTask,
			error: taskError,
			refetch: taskRefetch,
		},
	] = useQueries({
		queries: [
			{
				queryKey: ["questionnaire activity reports"],
				queryFn: () =>
					reportService.getAllQuestionnaireActivityReports(token || ""),
				enabled: !!token && reportToShow === "questionnaire",
			},
			{
				queryKey: ["survey activity reports"],
				queryFn: () => reportService.getAllSurveyActivityReports(token || ""),
				enabled: !!token && reportToShow === "survey",
			},
			{
				queryKey: ["task activity reports"],
				queryFn: () => reportService.getAllTaskActivityReports(token || ""),
				enabled: !!token && reportToShow === "task",
			},
		],
	});

	if (
		(isPendingQuestionnaire && !!token && reportToShow === "questionnaire") ||
		(isPendingSurvey && !!token && reportToShow === "survey") ||
		(isPendingTask && !!token && reportToShow === "task")
	)
		return <div className="p-4">Loading..</div>;

	if (questionnaireError)
		return (
			<ErrorScreen
				error={questionnaireError}
				reset={questionnaireRefetch}
				containerClass="min-h-[50vh]"
			/>
		);

	if (surveyError)
		return (
			<ErrorScreen
				error={surveyError}
				reset={surveyRefetch}
				containerClass="min-h-[50vh]"
			/>
		);

	if (taskError)
		return (
			<ErrorScreen
				error={taskError}
				reset={taskRefetch}
				containerClass="min-h-[50vh]"
			/>
		);

	return (
		<>
			<section className="w-full rounded-2xl bg-white p-8 shadow-sm lg:p-16">
				<div className="grid grid-cols-1">
					<div>
						<ActivitySummaryBarChart
							reportToShow={reportToShow}
							setReportToShow={setReportToShow}
							data={
								reportToShow === "task"
									? taskData?.data?.data || []
									: reportToShow === "survey"
										? surveyData?.data?.data || []
										: questionnaireData?.data?.data || []
							}
						/>
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
							<ActivityMonthlyOverviewChart
								completed_responses={
									reportToShow === "task"
										? taskData?.data?.data.filter(
												(d) => d.id.toLowerCase() === month.toLowerCase()
											)[0].completed || 0
										: reportToShow === "survey"
											? surveyData?.data?.data.filter(
													(d) => d.id.toLowerCase() === month.toLowerCase()
												)[0].completed || 0
											: questionnaireData?.data?.data.filter(
													(d) => d.id.toLowerCase() === month.toLowerCase()
												)[0].completed || 0
								}
								incompleted_responses={
									reportToShow === "task"
										? taskData?.data?.data.filter(
												(d) => d.id.toLowerCase() === month.toLowerCase()
											)[0].pending || 0
										: reportToShow === "survey"
											? surveyData?.data?.data.filter(
													(d) => d.id.toLowerCase() === month.toLowerCase()
												)[0].pending || 0
											: questionnaireData?.data?.data.filter(
													(d) => d.id.toLowerCase() === month.toLowerCase()
												)[0].pending || 0
								}
								average_completion_rate={
									reportToShow === "task"
										? getMonthlyAverage(
												taskData?.data?.data.filter(
													(d) => d.id.toLowerCase() === month.toLowerCase()
												)[0].completed || 0,
												taskData?.data?.data.filter(
													(d) => d.id.toLowerCase() === month.toLowerCase()
												)[0].pending || 0
											)
										: reportToShow === "survey"
											? getMonthlyAverage(
													surveyData?.data?.data.filter(
														(d) => d.id.toLowerCase() === month.toLowerCase()
													)[0].completed || 0,
													surveyData?.data?.data.filter(
														(d) => d.id.toLowerCase() === month.toLowerCase()
													)[0].pending || 0
												)
											: getMonthlyAverage(
													questionnaireData?.data?.data.filter(
														(d) => d.id.toLowerCase() === month.toLowerCase()
													)[0].completed || 0,
													questionnaireData?.data?.data.filter(
														(d) => d.id.toLowerCase() === month.toLowerCase()
													)[0].pending || 0
												)
								}
							/>
						</div>
						<div>
							<h3 className="mt-2 text-lg font-bold">General Overview</h3>
							<ActivityGeneralOverviewChart
								total_completed_responses={
									reportToShow === "task"
										? (taskData?.data?.total || 0) -
											(taskData?.data?.pending || 0)
										: reportToShow === "survey"
											? (surveyData?.data?.total || 0) -
												(surveyData?.data?.pending || 0)
											: (questionnaireData?.data?.total || 0) -
												(questionnaireData?.data?.pending || 0)
								}
								total_incompleted_responses={
									reportToShow === "task"
										? taskData?.data?.pending || 0
										: reportToShow === "survey"
											? surveyData?.data?.pending || 0
											: questionnaireData?.data?.pending || 0
								}
								average_completion_rate={
									reportToShow === "task"
										? taskData?.data?.averageCompletionRate || 0
										: reportToShow === "survey"
											? surveyData?.data?.averageCompletionRate || 0
											: questionnaireData?.data?.averageCompletionRate || 0
								}
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
