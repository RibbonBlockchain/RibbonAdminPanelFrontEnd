import Image from "next/image";
import urls from "@/lib/urls";
import { ButtonLink } from "@/components/ui/button_link";
import { cn, formatCurrency } from "@/lib/utils";
import Header from "@/components/header";
import { programs } from "@/lib/sample_data";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reward Partners",
};

export default function RewardPoints() {
	return (
		<>
			<Header>Reward Partners</Header>

			<div className="mx-4 mt-12 flex flex-col gap-2 px-4">
				<span className="rounded-md font-medium drop-shadow-sm">
					Total Balance
				</span>
				<div className="rounded-md text-xl drop-shadow-sm">
					<span className="font-bold">12.26189225 WLD</span>
					<span className="text-black-neutral"> ≈ </span>
					<span className="text-black-neutral">
						${formatCurrency(2_500_000.91, { currency: "USD" })}
					</span>
				</div>
			</div>

			<section className="mx-4 my-12 gap-6">
				<Table>
					<TableHeader className="h-20 border-y border-black-neutral/20 bg-white">
						<TableRow className="uppercase">
							<TableHead>name</TableHead>
							<TableHead>price</TableHead>
							<TableHead>1h</TableHead>
							<TableHead>24h</TableHead>
							<TableHead>7d</TableHead>
							<TableHead>volume</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="[&_tr:nth-child(even)]:bg-white [&_tr:nth-child(odd)]:bg-transparent">
						{programs.map((program, index) => (
							<TableRow
								key={`program-${index}`}
								className="border-black-neutral/20 hover:bg-transparent"
							>
								<TableCell className="font-medium">
									<figure className="flex gap-x-2">
										<Image
											src={program.image}
											alt=""
											width={40}
											height={40}
											className="size-10 border"
										/>
										<figcaption>
											<h2 className="text-base font-medium">{program.name}</h2>
											<span className="text-xs font-medium">
												{program.ticker}
											</span>
										</figcaption>
									</figure>
								</TableCell>
								<TableCell>
									${formatCurrency(program.tvl, { currency: "USD" })}
								</TableCell>
								<TableCell
									className={cn(
										program.tvl > 0 ? "text-green-500" : "text-red-500"
									)}
								>
									{program.tvl > 0 ? "+" : program.tvl < 0 ? "-" : ""}
									{program.tvl}
								</TableCell>
								<TableCell
									className={cn(
										program.tvl > 0 ? "text-green-500" : "text-red-500"
									)}
								>
									{program.tvl > 0 ? "+" : program.tvl < 0 ? "-" : ""}
									{program.tvl}
								</TableCell>
								<TableCell
									className={cn(
										program.tvl > 0 ? "text-green-500" : "text-red-500"
									)}
								>
									{program.tvl > 0 ? "+" : program.tvl < 0 ? "-" : ""}
									{program.tvl}
								</TableCell>
								<TableCell>$250.00</TableCell>
								<TableCell>
									<ButtonLink
										href={urls.dashboard.reward_partners.single(
											program.id.toString()
										)}
									>
										Fund Program
									</ButtonLink>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
		</>
	);
}
