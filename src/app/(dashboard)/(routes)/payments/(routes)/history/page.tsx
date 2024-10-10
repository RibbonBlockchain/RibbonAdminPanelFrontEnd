import Header from "@/components/header";

import type { Metadata } from "next";
import PaymentHistoryPage from "./_components/payment_history_table";
import Link from "next/link";
import BreadcrumIconSvg from "@/components/svgs/breadcrum_icon";
import urls from "@/lib/urls";

export const metadata: Metadata = {
	title: "Mass Payment History",
};

export default function Page({
	searchParams,
}: {
	searchParams: { q?: string; page?: string; pageSize?: string };
}) {
	return (
		<>
			<Header>Payments History</Header>

			<div className="my-4 flex items-center gap-x-2 px-4">
				<Link
					href={urls.dashboard.mass_payments.index}
					className="hover:text-primary"
				>
					Mass payment
				</Link>
				<BreadcrumIconSvg />
				<span>History</span>
			</div>

			<PaymentHistoryPage />
		</>
	);
}
