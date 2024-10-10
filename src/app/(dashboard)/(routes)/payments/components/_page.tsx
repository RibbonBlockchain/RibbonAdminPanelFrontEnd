"use client";
import { useToken } from "@/components/providers/token";
import { toast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { paymentService } from "@/services/payments";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

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
			// console.log(error);
			toast({
				title: "Error",
				description: getErrorMessage(error),
				duration: 5000,
				variant: "destructive",
			});
		},
	});

	const {
		data,
		isPending: loadingPartners,
		error,
		refetch: refetchCountries,
	} = useQuery({
		queryKey: ["reward-partners"],
		queryFn: () => paymentService.getRewardPartners(token || ""),
		enabled: !!token,
	});

	let wallet = "";
	let provider = "";
	let value = "";

	const rpData: any = data;

	if (data) {
		const rpWalletData = rpData.data.data.find((d: any) => d.id === 0);
		wallet = rpWalletData.address;
		provider = rpWalletData.provider;
		value = rpWalletData.value;
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
			<div className="my-12 flex w-full items-center justify-between px-10">
				<h2 className=" font-semibold">
					USDC Mass Grant payments on BASE layer 2 network
				</h2>
				<h3 className="small flex flex-col items-center">
					<span>Network: {provider}</span>
					<span>
						Address:{" "}
						<a href="" className="text-indigo-600">
							{wallet}
						</a>
					</span>
					<span className="font-semibold">
						${value} <small className="text-xs font-normal">USDC</small>
					</span>
				</h3>
			</div>
			<div className="container mx-auto p-8">
				<div className="flex justify-between">
					<h2 className="mb-4 text-xl font-semibold">
						Enter Recipients & Amounts
					</h2>
					<Button
						type="default"
						className="rounded border-purple-500 px-6 py-2 text-purple-500 hover:bg-purple-100"
					>
						Upload CSV file
					</Button>
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
