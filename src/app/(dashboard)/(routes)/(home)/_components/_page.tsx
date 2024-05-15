"use client";

import TotalActivitiesSvg from "@/components/svgs/total_activities";
import AverageCompletionRateSvg from "@/components/svgs/average_completion_rate";
import TotalResponsesSvg from "@/components/svgs/total_responses";

import RewardPointsImage from "@/public/images/reward_points_plain.webp";
import SurveysImage from "@/public/images/surveys_plain.webp";
import TaskImage from "@/public/images/tasks_plain.webp";
import QuestionnaireImage from "@/public/images/questionnaires_plain.webp";
import urls from "@/lib/urls";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button_link";
import { formatCurrency } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import RewardChart from "./reward_chart";
import UsersChart from "./users_chart";
import CreateSurveySvg from "@/components/svgs/create_survey";
import { FaArrowRight } from "react-icons/fa6";
import ReportAnalysisSvg from "@/components/svgs/report_analysis";
import { useToken } from "@/components/providers/token";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard";
import ErrorScreen from "@/components/sections/error";
import { rewardPartnerService } from "@/services/reward_partner";

export default function HomePage() {
	const { token } = useToken();

	const { data, isPending, error, refetch } = useQuery({
		queryKey: ["dashboard summary"],
		queryFn: () => dashboardService.getSummary(token || ""),
		enabled: !!token,
	});

	const {
		data: rewardData,
		isPending: isPendingReward,
		error: errorReward,
		refetch: refetchReward,
	} = useQuery({
		queryKey: ["reward partners", {}],
		queryFn: () => rewardPartnerService.getAll({}, token || ""),
		enabled: !!token,
	});

	if (isPending) return <div className="p-4">Loading...</div>;

	if (error) return <ErrorScreen error={error} reset={refetch} />;

	return (
		<section className="mx-4 grid gap-4 py-12 xl:grid-cols-4">
			<div className="col-span-3 grid  grid-cols-3 gap-4">
				{/* Overview */}
				<div className="flex gap-4 rounded-2xl bg-white px-6 py-4">
					<TotalActivitiesSvg className="min-w-fit" />
					<div className="flex flex-col text-black-primary">
						<span className="text-sm">Total activities</span>
						<span className="text-3xl font-bold">
							{data?.data?.totalActivities || 0}
						</span>
					</div>
				</div>
				<div className="flex gap-4 rounded-2xl bg-white px-6 py-4">
					<AverageCompletionRateSvg className="min-w-fit" />
					<div className="flex flex-col text-black-primary">
						<span className="text-sm">Avg. Completion rate</span>
						<span className="text-3xl font-bold">
							{Math.round(data?.data?.completionRate || 0)}%
						</span>
					</div>
				</div>
				<div className="flex gap-4 rounded-2xl bg-white px-6 py-4">
					<TotalResponsesSvg className="min-w-fit" />
					<div className="flex flex-col text-black-primary">
						<span className="text-sm">Total responses</span>
						<span className="text-3xl font-bold">
							{data?.data?.totalResponses || 0}
						</span>
					</div>
				</div>

				{/* Chart */}
				<div className="col-span-3 rounded-2xl bg-white px-4 py-8">
					<div className="grid grid-cols-7 gap-6 divide-x">
						<div className="col-span-5 ">
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

						<div className="col-span-2 px-4">
							<h2 className="text-nowrap text-lg font-bold">Users Overview</h2>
							<UsersChart
								active_users={data?.data?.activeUsers || 0}
								inactive_users={data?.data?.inactiveUsers || 0}
							/>
						</div>
					</div>
				</div>

				{/* summary */}
				<ul className="col-span-3 flex flex-col gap-4 rounded-2xl bg-white px-4 py-8">
					{summary_list({
						reward: data.data?.rewardPoints || 0,
						questionnaire: data.data?.questionnaire || 0,
						task: data.data?.task || 0,
						survey: data.data?.survey || 0,
					}).map((item) => (
						<li
							key={item.title}
							className="grid grid-cols-3 items-center gap-4"
						>
							<div className="flex items-center gap-2">
								<Image src={item.image} alt={item.title} />
								<span>{item.title}</span>
							</div>
							<span>{formatCurrency(item.value, { currency: "USD" })}</span>
							<ButtonLink
								variant={"faint"}
								href={item.link_href}
								className="w-full max-w-52"
							>
								{item.link_text}
							</ButtonLink>
						</li>
					))}
				</ul>
			</div>

			<div className="col-span-3 grid w-full grid-cols-2 gap-4 xl:col-span-1 xl:flex xl:flex-col">
				<div className="flex min-h-36 w-full flex-col justify-between gap-y-4 rounded-2xl bg-black px-4 py-8 text-white">
					<h2 className="flex items-center gap-2 text-nowrap text-lg font-bold">
						<ReportAnalysisSvg />
						<span>Report Analysis</span>
					</h2>
					<p className="text-xl text-white">
						Select a report type and Export Report Analysis
					</p>
					<ButtonLink href={urls.dashboard.reports} className="max-w-48">
						Print reports analysis
					</ButtonLink>
				</div>

				{/* create survey */}
				<div className="flex flex-col justify-center gap-y-4 rounded-2xl bg-white px-4 py-8">
					<CreateSurveySvg className="mx-auto" />
					<h2 className="text-nowrap text-center text-lg font-bold">
						Create a new survey
					</h2>
					<p className="text-center text-sm text-black-neutral">
						Click the button below and start collecting response in minutes
					</p>
					<ButtonLink
						href={urls.dashboard.surveys.index}
						className="w-full rounded-xl"
					>
						Create survey
					</ButtonLink>
				</div>

				{/* Reward Partners */}

				<div className="col-span-2 min-h-36 rounded-2xl bg-white px-4 py-8">
					<h2 className="text-nowrap text-center text-lg font-bold">
						Reward partners
					</h2>

					<ul className="mt-8 flex flex-col gap-y-4">
						{rewardData?.data?.data.map((partner) => (
							<li
								key={partner.id}
								className="flex items-center justify-between gap-4"
							>
								<span>{partner.name}</span>
								<span className="rounded-lg bg-[#FCEED6] px-2 py-1 text-sm">
									TVL + ${formatCurrency(partner.volume)}
								</span>
							</li>
						))}
					</ul>

					<ButtonLink
						href={urls.dashboard.reward_partners.index}
						variant={"plain"}
						className="mt-4 w-full text-primary hover:text-primary-900"
					>
						View all <FaArrowRight className="ml-2" />
					</ButtonLink>
				</div>
			</div>
		</section>
	);
}

const summary_list = (input: {
	reward: number;
	survey: number;
	questionnaire: number;
	task: number;
}) => [
	{
		image: RewardPointsImage,
		title: "Reward Partners",
		value: input.reward,
		link_text: "Reward partners",
		link_href: urls.dashboard.reward_partners.index,
	},
	{
		image: SurveysImage,
		title: "Surveys",
		value: input.survey,
		link_text: "View surveys",
		link_href: urls.dashboard.surveys.index,
	},
	{
		image: QuestionnaireImage,
		title: "Questionnaire",
		value: input.questionnaire,
		link_text: "Upload questionnaire",
		link_href: urls.dashboard.questionnaires.index,
	},
	{
		image: TaskImage,
		title: "Tasks",
		value: input.task,
		link_text: "View tasks",
		link_href: urls.dashboard.tasks.index,
	},
];
