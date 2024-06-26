import Header from "@/components/header";
import Link from "next/link";
import BreadcrumIconSvg from "@/components/svgs/breadcrum_icon";
import RewardPartnerSinglePage from "./_components/_page";
import urls from "@/lib/urls";

export async function generateMetadata({ params }: { params: { id: string } }) {
	return {
		title: `Deposit address - ${params.id}`,
	};
}

const page = ({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { q?: string; page?: string; pageSize?: string };
}) => {
	return (
		<>
			<Header>Reward Partners</Header>

			<div className="my-4 flex items-center gap-x-2 px-4">
				<Link
					href={urls.dashboard.reward_partners.index}
					className="hover:text-primary"
				>
					Reward partners
				</Link>
				<BreadcrumIconSvg />
				<span>Deposit address</span>
			</div>

			<RewardPartnerSinglePage params={params} searchParams={searchParams} />
		</>
	);
};

export default page;
