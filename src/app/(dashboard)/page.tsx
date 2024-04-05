import Image from "next/image";
import RewardIcon from "@/public/images/reward.webp";
import QuestionnaireIcon from "@/public/images/questionnaire.webp";
import SurveysIcon from "@/public/images/surveys.webp";
import TasksIcon from "@/public/images/tasks.webp";
import { FaArrowRightLong } from "react-icons/fa6";
import urls from "@/lib/urls";
import { ButtonLink } from "@/components/ui/button_link";

export default function Home() {
	return (
		<section className="mx-4 grid grid-cols-2 gap-10 py-12">
			<figure className="w-full space-y-6 rounded-lg bg-[#EEECFF] p-6">
				<Image
					src={RewardIcon}
					alt="reward"
					className="max-w-10"
					priority={true}
				/>
				<figcaption className="flex flex-col gap-2">
					<h2 className="font-semibold">Rewards Point Overview</h2>
					<span className="text-2xl font-bold">10,000,000,000,000</span>
					<ButtonLink
						href={urls.dashboard.reward_points}
						className="mt-6 w-full gap-2"
					>
						Reward points <FaArrowRightLong />
					</ButtonLink>
				</figcaption>
			</figure>

			<figure className="w-full space-y-6 rounded-lg bg-[#E4FCEC] p-6">
				<Image
					src={QuestionnaireIcon}
					alt="questionnaires"
					className="max-w-10"
					priority={true}
				/>
				<figcaption className="flex flex-col gap-2">
					<h2 className="font-semibold">Questionnaires</h2>
					<span className="text-2xl font-bold">10,000</span>
					<ButtonLink
						href={urls.dashboard.questionnaires.index}
						className="mt-6 w-full gap-2"
					>
						View questionnaires <FaArrowRightLong />
					</ButtonLink>
				</figcaption>
			</figure>

			<figure className="w-full space-y-6 rounded-lg bg-[#FEF4F3] p-6">
				<Image
					src={SurveysIcon}
					alt="surveys"
					className="max-w-10"
					priority={true}
				/>
				<figcaption className="flex flex-col gap-2">
					<h2 className="font-semibold">Surveys</h2>
					<span className="text-2xl font-bold">5,000</span>
					<ButtonLink
						href={urls.dashboard.surveys}
						className="mt-6 w-full gap-2"
					>
						View surveys <FaArrowRightLong />
					</ButtonLink>
				</figcaption>
			</figure>

			<figure className="w-full space-y-6 rounded-lg bg-[#FEECFC] p-6">
				<Image
					src={TasksIcon}
					alt="tasks"
					className="max-w-10"
					priority={true}
				/>
				<figcaption className="flex flex-col gap-2">
					<h2 className="font-semibold">Tasks</h2>
					<span className="text-2xl font-bold">100</span>
					<ButtonLink href={urls.dashboard.tasks} className="mt-6 w-full gap-2">
						View tasks <FaArrowRightLong />
					</ButtonLink>
				</figcaption>
			</figure>
		</section>
	);
}
