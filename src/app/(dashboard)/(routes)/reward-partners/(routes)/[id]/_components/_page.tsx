"use client";

import React from "react";
import Link from "next/link";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { ImSpinner3 } from "react-icons/im";

import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import BreadcrumIconSvg from "@/components/svgs/breadcrum_icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FundingHistorySvg from "@/components/svgs/funding_history";
import { Button } from "@/components/ui/button";
import InputDropdown from "./input_dropdown";
import DepositAddress from "./deposit_address";

import urls from "@/lib/urls";
import { funding_history } from "@/lib/sample_data";
import { cn, getTimeAgo, getErrorMessage, debounce } from "@/lib/utils";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rewardPartnerService } from "@/services/reward_partner";
import { useToken } from "@/components/providers/token";
import { toast } from "@/components/ui/use-toast";

const RewardPartnerSinglePage = () => {
	const qc = useQueryClient();
	const { token } = useToken();

	const [input, setInput] = React.useState(0);
	const [output, setOutput] = React.useState(0);

	const { mutate: createVaultMutation, isPending: isCreateVaultPending } =
		useMutation({
			mutationKey: ["Create Vault"],
			mutationFn: async () =>
				await rewardPartnerService.createVault(token || ""),
			onSuccess(data) {
				toast({
					title: "Success",
					description: data?.message,
					duration: 5000,
				});
				qc.refetchQueries({
					queryKey: ["reward partners", { id: 1 }],
					type: "active",
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

	React.useEffect(() => {
		const timer = setTimeout(() => setOutput(input * 5000 * (90 / 100)), 700);

		() => clearTimeout(timer);
	}, [input, setOutput]);

	React.useEffect(() => {
		const timer = setTimeout(() => setInput(output / 5000 / (90 / 100)), 700);

		() => clearTimeout(timer);
	}, [output, setInput]);

	return (
		<>
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

			<section className="mx-4 grid grid-cols-2 divide-x rounded-2xl bg-white p-6">
				<div className="flex flex-col gap-y-6 p-4 pr-8">
					<div className="rounded-xl border p-4">
						<Label className="text-sm text-primary">Input</Label>
						<div className="relative mt-2 flex items-center gap-x-3">
							<InputDropdown />
							<Input
								value={input}
								onChange={(e) => setInput(Number(e.target.value))}
								min={0}
								step={0.01}
								type="number"
								className={cn(
									"hide-number-input-buttons from-background w-full appearance-none rounded-xl border-0 text-right text-xl",
									"focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-transparent"
								)}
							/>
						</div>
						<div className="mt-2 flex justify-end gap-2 text-xs text-black-neutral">
							<span>1 wld</span>=<span>5000 pts</span>
						</div>
					</div>

					<LiaExchangeAltSolid className="-rotate-90 self-center text-xl" />

					<div className="rounded-xl border p-4">
						<Label className="text-sm text-primary">Output</Label>
						<div className="relative mt-2 flex items-center gap-x-3">
							<span className="h-fit rounded-xl bg-gray-300 px-2 py-0.5 text-sm font-semibold">
								PTS
							</span>
							<Input
								value={output}
								onChange={(e) => setOutput(Number(e.target.value))}
								step={1}
								min={0}
								type="number"
								className={cn(
									"hide-number-input-buttons from-background w-full appearance-none rounded-xl border-0 text-right text-xl",
									"focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-transparent"
								)}
							/>
						</div>
						<div className="mt-4 flex justify-between gap-x-6 text-xs">
							<span>Fees</span>
							<span>1 USDT</span>
						</div>
					</div>

					<Button disabled>Mint to vault</Button>
				</div>
				<div className="flex flex-col justify-center gap-y-4 p-4 pr-0">
					<h2 className="text-center text-lg font-bold">
						Add WLD tokens on
						<span className="italic text-red-500"> Optimism </span> Mainnet
					</h2>

					<p className="-mt-3 text-center text-sm">
						Copy vault and use it to deposit payment
					</p>

					<div className="mt-8 flex w-full flex-col items-center gap-8 [&>*]:max-w-[80%]">
						<DepositAddress />
						<Button
							disabled={isCreateVaultPending}
							className="w-full rounded-xl"
							onClick={() => createVaultMutation()}
						>
							{isCreateVaultPending ? (
								<ImSpinner3 className="mr-1 animate-spin" />
							) : (
								"Create Vault"
							)}
						</Button>
					</div>
				</div>
			</section>

			<section className="mx-4 mb-12 mt-8 rounded-2xl bg-white p-6">
				<h2 className="text-lg font-bold">Funding History</h2>

				<Table className="mt-6">
					<TableHeader className="sr-only h-20 border-y border-black-neutral/20 bg-white">
						<TableRow className="uppercase">
							<TableHead>name</TableHead>
							<TableHead>address</TableHead>
							<TableHead>status</TableHead>
							<TableHead>amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="[&_tr:nth-child(even)]:bg-white [&_tr:nth-child(odd)]:bg-transparent">
						{funding_history.map((history, index) => (
							<TableRow
								key={`program-${index}`}
								className="border-black-neutral/20 hover:bg-transparent"
							>
								<TableCell className="pl-0 font-medium">
									<figure className="flex gap-x-2">
										<FundingHistorySvg />
										<figcaption>
											<h2 className="text-base font-medium">{history.name}</h2>
											<span className="text-xs font-light text-black-neutral">
												{getTimeAgo(history.date)}
											</span>
										</figcaption>
									</figure>
								</TableCell>
								<TableCell className="text-black-neutral">
									{history.wallet_address}
								</TableCell>
								<TableCell>
									<span
										className={cn(
											history.status === "Successful"
												? "bg-green-100 text-green-900"
												: "bg-red-100 text-red-900",
											"rounded-md px-2 py-1"
										)}
									>
										{history.status}
									</span>
								</TableCell>
								<TableCell className="flex flex-col text-right">
									<span className="text-lg font-medium">
										{history.amount.from.value} {history.amount.from.unit}
									</span>
									<span className="text-xs font-medium text-black-neutral">
										+{history.amount.to.unit}
										{history.amount.to.value}
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
		</>
	);
};

export default RewardPartnerSinglePage;
