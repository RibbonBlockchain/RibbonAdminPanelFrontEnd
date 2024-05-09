import Header from "@/components/header";
import BreadcrumIconSvg from "@/components/svgs/breadcrum_icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import urls from "@/lib/urls";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import React from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import QRCode from "./_components/qrcode";
import DepositAddress from "./_components/deposit_address";
import { ButtonLink } from "@/components/ui/button_link";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { funding_history, programs } from "@/lib/sample_data";
import { formatCurrency, cn, getTimeAgo } from "@/lib/utils";
import Image from "next/image";
import FundingHistorySvg from "@/components/svgs/funding_history";

export async function generateMetadata({ params }: { params: { id: string } }) {
	return {
		title: `Deposit address - ${params.id}`,
	};
}

const page = () => {
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

			<section className="mx-4 grid grid-cols-2 divide-x rounded-2xl bg-white p-6">
				<div className="flex flex-col gap-y-6 p-4 pr-8">
					<h2 className="text-center text-lg font-bold">Token conversion</h2>

					<div>
						<Label className="text-sm text-primary">Input</Label>
						<div className="relative mt-2">
							<Select>
								<SelectTrigger className="absolute max-w-24 rounded-l-xl rounded-r-none">
									<SelectValue
										className="placeholder:text-neutral-500"
										placeholder="Choose a month"
									/>
								</SelectTrigger>
								<SelectContent className="max-w-sm">
									<SelectItem value={"wld"} className="cursor-pointer">
										WLD
									</SelectItem>
									<SelectItem value={"usdt"} className="cursor-pointer">
										USDT
									</SelectItem>
								</SelectContent>
							</Select>
							<Input
								type="number"
								className="hide-number-input-buttons from-background w-full appearance-none rounded-xl pl-28 text-right text-xl"
							/>
						</div>
						<div className="mt-2 flex justify-end gap-2 text-xs text-black-neutral">
							<span>1 USDT</span>=<span>0.812 WLD</span>
						</div>
					</div>

					<LiaExchangeAltSolid className="-rotate-90 self-center text-xl" />

					<div>
						<Label className="text-sm text-primary">Output</Label>
						<div className="relative mt-2">
							<Select>
								<SelectTrigger className="absolute max-w-24 rounded-l-xl rounded-r-none">
									<SelectValue
										className="placeholder:text-neutral-500"
										placeholder="Choose a month"
									/>
								</SelectTrigger>
								<SelectContent className="max-w-sm">
									<SelectItem value={"wld"} className="cursor-pointer">
										WLD
									</SelectItem>
									<SelectItem value={"usdt"} className="cursor-pointer">
										USDT
									</SelectItem>
								</SelectContent>
							</Select>
							<Input
								type="number"
								className="hide-number-input-buttons from-background w-full appearance-none rounded-xl pl-28 text-right text-xl"
							/>
						</div>
						<div className="mt-2 flex justify-end gap-2 text-xs text-black-neutral">
							<span>100 WLD</span>=<span>584.78 USDT</span>
						</div>
					</div>
					<div className="flex justify-between gap-x-6 text-xs">
						<span>Fees</span>
						<span>1 USDT</span>
					</div>
				</div>
				<div className="flex flex-col gap-y-4 p-4 pr-0">
					<h2 className="text-center text-lg font-bold">
						Add WLD tokens on
						<span className="italic text-red-500"> Optimism </span> Mainnet
					</h2>

					<QRCode />
					<DepositAddress />
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

export default page;
