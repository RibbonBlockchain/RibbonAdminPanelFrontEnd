import Header from "@/components/header";
import RewardPartnerSinglePage from "./_components/_page";

export async function generateMetadata({ params }: { params: { id: string } }) {
	return {
		title: `Deposit address - ${params.id}`,
	};
}

const page = () => {
	return (
		<>
			<Header>Reward Partners</Header>

			<RewardPartnerSinglePage />
		</>
	);
};

export default page;
