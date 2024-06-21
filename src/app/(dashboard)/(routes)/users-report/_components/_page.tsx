"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import UsersReportFilter from "./filter";
import Paginator from "@/components/paginator";

import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import urls from "@/lib/urls";
import { useRouter } from "next/navigation";

const UsersReportPage = () => {
	const router = useRouter();
	return (
		<section className="mb-12 h-full min-h-[700px] px-4">
			<div className="flex w-full justify-between bg-white p-4 shadow">
				<div className="flex w-full gap-4">
					<div className="relative">
						<IoSearchOutline className="absolute left-2 top-1/2 -translate-y-1/2" />
						<Input placeholder="Search by location" className="pl-8" />
					</div>
					<UsersReportFilter />
				</div>

				<Paginator
					containerClass="justify-end"
					current_page={0}
					total_pages={0}
					handlePaginate={() => {}}
				/>
			</div>

			<Table>
				<TableHeader className="h-20 border-y border-black-neutral/20 bg-white">
					<TableRow className="[&_th]:text-center">
						<TableHead>User ID</TableHead>
						<TableHead>Questionnaires completed</TableHead>
						<TableHead>Total rewards Earned</TableHead>
						<TableHead>Daily rewards Earned</TableHead>
						<TableHead>User Location</TableHead>
						<TableHead>User SES</TableHead>
						<TableHead>Average Ratings</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="[&_tr:nth-child(even)]:bg-white [&_tr:nth-child(odd)]:bg-transparent">
					{Array.from({ length: 10 }).map((user, index) => (
						<TableRow
							key={`user-${index}`}
							className="cursor-pointer border-black-neutral/20 text-center odd:hover:bg-neutral-100 even:hover:bg-neutral-100/50"
							onClick={() =>
								router.push(
									urls.dashboard.users_report.single_user(index.toString())
								)
							}
						>
							<TableCell>Rb 01</TableCell>
							<TableCell>55</TableCell>
							<TableCell>55 wld</TableCell>
							<TableCell>55 wld</TableCell>
							<TableCell>Argentina</TableCell>
							<TableCell>77</TableCell>
							<TableCell>4</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
};

export default UsersReportPage;
