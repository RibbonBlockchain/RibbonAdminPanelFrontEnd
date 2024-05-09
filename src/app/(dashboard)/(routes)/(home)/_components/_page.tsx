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
import { programs } from "@/lib/sample_data";
import { FaArrowRight } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import ReportAnalysisSvg from "@/components/svgs/report_analysis";

export default function HomePage() {
	const { data: session } = useSession({
		required: true,
	});

	return (
		<section className="mx-4 grid gap-4 py-12 xl:grid-cols-4">
			<div className="col-span-3 grid  grid-cols-3 gap-4">
				{/* Overview */}
				<div className="flex gap-4 rounded-2xl bg-white px-6 py-4">
					<TotalActivitiesSvg className="min-w-fit" />
					<div className="flex flex-col text-black-primary">
						<span className="text-sm">Total activities</span>
						<span className="text-3xl font-bold">50</span>
					</div>
				</div>
				<div className="flex gap-4 rounded-2xl bg-white px-6 py-4">
					<AverageCompletionRateSvg className="min-w-fit" />
					<div className="flex flex-col text-black-primary">
						<span className="text-sm">Avg. Completion rate</span>
						<span className="text-3xl font-bold">80%</span>
					</div>
				</div>
				<div className="flex gap-4 rounded-2xl bg-white px-6 py-4">
					<TotalResponsesSvg className="min-w-fit" />
					<div className="flex flex-col text-black-primary">
						<span className="text-sm">Total responses</span>
						<span className="text-3xl font-bold">500</span>
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
							<UsersChart />
						</div>
					</div>
				</div>

				{/* summary */}
				<ul className="col-span-3 flex flex-col gap-4 rounded-2xl bg-white px-4 py-8">
					{summary_list.map((item) => (
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
					<ButtonLink href="" className="max-w-48">
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
						{programs.map((partner) => (
							<li
								key={partner.id}
								className="flex items-center justify-between gap-4"
							>
								<span>{partner.name}</span>
								<span className="rounded-lg bg-[#FCEED6] px-2 py-1 text-sm">
									TVL + ${formatCurrency(partner.tvl)}
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

const summary_list = [
	{
		image: RewardPointsImage,
		title: "Reward Partners",
		value: 100_000_000_000,
		link_text: "Reward partners",
		link_href: urls.dashboard.reward_partners.index,
	},
	{
		image: SurveysImage,
		title: "Surveys",
		value: 5000,
		link_text: "View surveys",
		link_href: urls.dashboard.surveys.index,
	},
	{
		image: QuestionnaireImage,
		title: "Questionnaire",
		value: 10000,
		link_text: "Upload questionnaire",
		link_href: urls.dashboard.questionnaires.index,
	},
	{
		image: TaskImage,
		title: "Tasks",
		value: 150,
		link_text: "View tasks",
		link_href: urls.dashboard.tasks.index,
	},
];
