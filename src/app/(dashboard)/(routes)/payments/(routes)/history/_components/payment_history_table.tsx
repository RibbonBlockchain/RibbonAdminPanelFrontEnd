"use client";

import { useToken } from "@/components/providers/token";
import { paymentService } from "@/services/payments";
import { useQuery } from "@tanstack/react-query";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

const PaymentHistoryPage = () => {
	const { token } = useToken();

	const { data, isPending, refetch } = useQuery({
		queryKey: ["payment-history"],
		queryFn: () => paymentService.getPaymentHistory(token || ""),
		enabled: !!token,
	});

	const trx: any = data;

	return (
		<div className="p-4">
			{trx &&
				trx.data.in.transfers.map((tx: any, index: number) => (
					<div
						key={index}
						className="flex items-center justify-between border-b border-gray-200 p-4"
					>
						{/* Left Section */}
						<div className="flex items-center space-x-2">
							<div
								// className={`text-xl ${tx.sent ? "text-red-500" : "text-green-500"}`}
								className={`text-xl text-red-500`}
							>
								{/* {tx.sent ? <GoArrowUpRight /> : <GoArrowDownLeft />} */}
								<GoArrowUpRight />
							</div>
							<div>
								<div className="text-sm font-semibold">Sent</div>
								<div className="text-xs text-gray-500">{tx.to}</div>
							</div>
						</div>

						{/* Right Section */}
						<div className="text-right">
							<div className="text-sm font-semibold">
								{tx.value} {tx.asset}
							</div>
							<div className="text-xs text-gray-500">{tx.asset}</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default PaymentHistoryPage;
