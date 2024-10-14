"use client";

import { useToken } from "@/components/providers/token";
import { paymentService } from "@/services/payments";
import { useQuery } from "@tanstack/react-query";
import { Spin, Table } from "antd";
import { format } from "date-fns";
import { HiOutlineArrowDownLeft, HiOutlineArrowUpRight } from "react-icons/hi2";

const PaymentHistoryPage = () => {
	const { token } = useToken();

	const { data, isPending } = useQuery({
		queryKey: ["payment-history"],
		queryFn: () => paymentService.getPaymentHistory(token || ""),
		enabled: !!token,
	});

	const trx: any = data;

	if (isPending) {
		return (
			<div className="flex justify-center">
				<Spin />
			</div>
		);
	}

	// Merge in and out transfers and label them
	const mergedData: any[] = [
		...trx.data.in.transfers.map((item: any) => ({ ...item, type: "in" })),
		...trx.data.out.transfers.map((item: any) => ({ ...item, type: "out" })),
	];

	// Sort by blockTimestamp
	const sortedData = mergedData.sort((a, b) => {
		return (
			new Date(b.metadata.blockTimestamp).getTime() -
			new Date(a.metadata.blockTimestamp).getTime()
		);
	});

	// Create the dataSource
	const dataSource = sortedData.map((item, index) => ({
		key: (index + 1).toString(),
		type: item.type,
		blockNum: item.blockNum,
		uniqueId: item.uniqueId,
		hash: item.hash,
		from: item.from,
		to: item.to,
		value: item.value,
		asset: item.asset,
		blockTimestamp: item.metadata.blockTimestamp,
	}));

	const columns = [
		{
			title: "Transaction History",
			dataIndex: "type",
			key: "type",
			render: (type: string) => {
				return (
					<div>
						{type === "in" ? (
							<div className="flex items-center space-x-2">
								<span className="inline-block rounded-full bg-green-100 p-2">
									<HiOutlineArrowDownLeft
										className="text-green-500"
										size={15}
									/>
								</span>
								<span>
									<p className="font-semibold">Received</p>
									<p className="text-xs font-semibold">USDC</p>
								</span>
							</div>
						) : (
							<div className="flex items-center space-x-2">
								<span className="inline-block rounded-full bg-red-100 p-2">
									<HiOutlineArrowUpRight className="text-red-500" size={15} />
								</span>
								<span>
									<p className="font-semibold">Sent</p>
									<p className="text-xs font-semibold">USDC</p>
								</span>
							</div>
						)}
					</div>
				);
			},
		},
		{
			dataIndex: "address",
			key: "address",
			render: (_: any, data: any) => (
				<>
					<p className="font-semibold ">
						{data.type === "out" ? `to: ${data.to}` : `from: ${data.from}`}
					</p>
					<p>{`hash: ${data.hash}`}</p>
				</>
			),
		},
		{
			dataIndex: "blockTimestamp",
			key: "blockTimestamp",
			render: (_: any, data: any) => (
				<div>
					<p className="font-semibold">
						{data.type === "in" ? "+" : "-"}
						{data.value} {data.asset}
					</p>
					<p className="text-xs">
						{format(new Date(data.blockTimestamp), "hh:mm a")} |{" "}
						{format(new Date(data.blockTimestamp), "do MMM, yyyy")}{" "}
					</p>
				</div>
			),
		},
	];

	return (
		<div className="p-4">
			<Table dataSource={dataSource} columns={columns} loading={isPending} />
		</div>
	);
};

export default PaymentHistoryPage;
