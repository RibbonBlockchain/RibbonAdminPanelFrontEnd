"use client";
import { useToken } from "@/components/providers/token";
import { toast } from "@/components/ui/use-toast";
import urls from "@/lib/urls";
import { getErrorMessage } from "@/lib/utils";
import { paymentService } from "@/services/payments";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";

const RecipientsForm = () => {
	const [form] = Form.useForm();
	const [fields, setFields] = useState([
		{ key: Date.now(), wallet: "", amount: "" },
	]);

	const handleAddField = () => {
		setFields([...fields, { key: Date.now(), wallet: "", amount: "" }]);
	};

	const handleRemoveField = (key: any) => {
		setFields(fields.filter((field) => field.key !== key));
	};

	const { token } = useToken();
	const { mutate, isPending } = useMutation({
		mutationKey: ["Send Mass Payment"],
		mutationFn: (data: any) =>
			paymentService.sendMassPayment(data, token || ""),

		onSuccess: (data) => {
			toast({
				title: "Success",
				duration: 5000,
			});
		},
		onError(error) {
			toast({
				title: "Error",
				description: getErrorMessage(error),
				duration: 5000,
				variant: "destructive",
			});
		},
	});

	const {
		data: partner,
		isPending: loadingPartner,
		refetch: refetchCountries,
	} = useQuery({
		queryKey: ["reward-partner"],
		queryFn: () => paymentService.getRewardPartner(token || ""),
		enabled: !!token,
	});

	let wallet = "";
	let provider = "";
	let value = "";

	const rpData: any = partner;

	if (rpData) {
		wallet = rpData.data.address;
		provider = rpData.data.provider;
		value = rpData.data.walletBalance;
	}

	const onFinish = (data: any) => {
		const result = Object.keys(data)
			.reduce((acc: any, key) => {
				const [type, id] = key.split("_");
				const index = acc.findIndex((item: any) => item.id === id);

				if (index === -1) {
					acc.push({
						id,
						[type]: data[key],
					});
				} else {
					acc[index][type] = data[key];
				}

				return acc;
			}, [])
			.map((r: any) => ({ address: r.address, amount: r.amount }));

		const dataToDisburse = { data: result };

		mutate(dataToDisburse);

		window.location.reload;
	};

	function formatWalletAddress(address: string) {
		if (address) {
			if (address.length <= 8) {
				return address;
			}

			const firstPart = address.slice(0, 4);
			const lastPart = address.slice(-4);
			return `${firstPart}...${lastPart}`;
		}
	}

	return (
		<>
			<div className="my-12 w-full justify-between space-y-4 px-10">
				<h2 className="text-xl font-semibold">
					USDC Mass Grant payments on BASE layer 2 network
				</h2>
				<div className="w-72 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
					<div className="p-3">
						<div className="mb-4">
							<span className="mb-1 block text-xs text-blue-100">
								Available Balance
							</span>
							<div className="flex items-center justify-between">
								<span className="text-2xl font-bold text-white">
									${value.toLocaleString()}
								</span>
								<div className="rounded-full bg-white/20 px-2 py-0.5">
									<span className="text-xs font-medium text-white">USDC</span>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between border-t border-white/10 pt-4">
							<div className="flex w-full items-center justify-between">
								<a
									target="_blank"
									href={`https://sepolia.basescan.org/address/${wallet}`}
									className="flex items-center space-x-1 font-mono text-xs text-blue-100"
								>
									<span>{formatWalletAddress(wallet)}</span>
									<RxExternalLink />
								</a>

								<div className="flex items-center space-x-2">
									<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
										<span className="text-sm font-bold text-white">C</span>
									</div>
									<span className="text-sm font-semibold text-white">
										Coinbase
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container mx-auto p-8">
				<div className="flex justify-between">
					<h2 className="mb-4 text-xl font-semibold">
						Enter Recipients & Amounts
					</h2>
					<Link href={urls.dashboard.mass_payments["payment-history"]}>
						<Button
							type="default"
							className="rounded border-purple-500 px-6 py-2 text-purple-500 hover:bg-purple-100"
						>
							History
						</Button>
					</Link>
				</div>
				<Form
					form={form}
					layout="vertical"
					name="recipients_form"
					onFinish={onFinish}
					className="space-y-4" // Reduced the space between each form item
				>
					{fields.map((field, index) => (
						<div key={field.key} className="grid grid-cols-2 gap-6">
							<Form.Item
								label="Wallet Address (ENS/0xAddress)"
								name={`address_${field.key}`}
								rules={[
									{ required: true, message: "Please enter wallet address" },
								]}
							>
								<Input placeholder="0xOmEAdDrEsS" />
							</Form.Item>

							<Form.Item
								label="$USDC Amount"
								name={`amount_${field.key}`}
								rules={[{ required: true, message: "Please enter amount" }]}
							>
								<Input placeholder="Amount" />
							</Form.Item>
						</div>
					))}

					<div className="flex items-center justify-around">
						{/* Add/Remove buttons at the bottom */}
						<div className="flex items-center justify-start space-x-4">
							<Button
								type="text"
								onClick={() => handleRemoveField(fields[fields.length - 1].key)}
								disabled={fields.length === 1} // Disable remove button when only one form is left
							>
								<FaMinus />
							</Button>
							<Button type="text" onClick={handleAddField}>
								<FaPlus />
							</Button>
						</div>

						{/* Pay button */}
						<div className="flex items-center justify-between">
							<Button
								loading={isPending}
								type="primary"
								htmlType="submit"
								className="rounded bg-purple-500 px-6 py-2 text-white hover:bg-purple-600"
							>
								Pay
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</>
	);
};

export default RecipientsForm;
