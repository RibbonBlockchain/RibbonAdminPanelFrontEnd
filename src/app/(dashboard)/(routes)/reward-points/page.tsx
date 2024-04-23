import Image from "next/image";
import RewardIcon from "@/public/images/reward.webp";
import QuestionnaireIcon from "@/public/images/questionnaire.webp";
import SurveysIcon from "@/public/images/surveys.webp";
import TasksIcon from "@/public/images/tasks.webp";
import { FaArrowRightLong } from "react-icons/fa6";
import urls from "@/lib/urls";
import { ButtonLink } from "@/components/ui/button_link";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";
import Header from "@/components/header";
import SearchInput from "../../_components/search_input";

export default function RewardPoints() {
	return (
		<>
			<Header>Reward Points</Header>
			<SearchInput
				placeholder="Search Programs"
				container_className="w-full max-w-xs self-end mt-12 mx-4"
			/>

			<div className="mx-4 mt-12 flex gap-6">
				<span className="rounded-md bg-[#FCECF0] p-2 drop-shadow-sm">
					Total supply: {formatCurrency(100_000_000_000, { currency: "USD" })}
				</span>
				<span className="rounded-md bg-[#FCECF0] p-2 drop-shadow-sm">
					Circulating supply:{" "}
					{formatCurrency(2_500_000_000, { currency: "USD" })}
				</span>
			</div>

			<section className="mx-4 my-12 grid grid-cols-3 gap-6">
				{programs.map((x) => (
					<figure
						key={`program-${x.id}`}
						className="rounded-lg bg-white p-6 drop-shadow-sm"
					>
						<Image
							src={x.image}
							alt={x.name}
							width={100}
							height={100}
							className="mx-auto max-w-10"
						/>
						<figcaption className="mt-4 flex flex-col items-center gap-2">
							<h2 className="text-2xl font-semibold">{x.name}</h2>
							<span className="rounded-lg bg-[#FCEED6] px-2 py-1 text-sm">
								TVL + ${formatCurrency(x.tvl)}
							</span>
							<ButtonLink
								href={urls.dashboard.reward_points}
								className="mt-6 w-full gap-2 rounded-2xl"
							>
								Fund Program
							</ButtonLink>
						</figcaption>
					</figure>
				))}
			</section>
		</>
	);
}

const programs = [
	{
		id: 1,
		image: "",
		name: "Worldcoin",
		tvl: 10_500_000_000,
	},
	{
		id: 2,
		image: "",
		name: "Binance",
		tvl: 20_700_100_000,
	},
	{
		id: 3,
		image: "",
		name: "BingX",
		tvl: 3_050_000,
	},
	{
		id: 4,
		image: "",
		name: "OKX",
		tvl: 100_000_000_000,
	},
	{
		id: 5,
		image: "",
		name: "Uniswap OP",
		tvl: 4_550_000_000,
	},
	{
		id: 6,
		image: "",
		name: "Mecx",
		tvl: 100_000_000_000,
	},
];
