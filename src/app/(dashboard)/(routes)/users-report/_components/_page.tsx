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
import { useToken } from "@/components/providers/token";
import { usersReportService } from "@/services/users_report";
import ErrorScreen from "@/components/sections/error";
import { useQuery } from "@tanstack/react-query";
import PaginateSection from "@/components/sections/paginate_section";
import Search from "@/components/search";

type Props = {
	searchParams: {
		q?: string;
		page?: string;
		pageSize?: string;
	};
};

const UsersReportPage: React.FC<Props> = (props) => {
	const router = useRouter();
	const { token } = useToken();

	const { data, isPending, error, refetch } = useQuery({
		queryKey: ["users report activities", props.searchParams],
		queryFn: () =>
			usersReportService.getUsersActivities(props.searchParams, token || ""),
		enabled: !!token,
	});

	return (
		<section className="mb-12 h-full min-h-[700px] px-4">
			<div className="flex w-full justify-between bg-white p-4 shadow">
				<div className="flex w-full gap-4">
					<Search form_className="w-fit" container_className="w-fit" />

					<UsersReportFilter />
				</div>

				<PaginateSection
					current_page={data?.data?.pagination.currentPage || 0}
					total_pages={data?.data?.pagination.totalPages || 0}
					containerClass="py-0"
				/>
			</div>

			{isPending ? (
				<div className="p-4">Loading...</div>
			) : error ? (
				<ErrorScreen error={error} reset={refetch} />
			) : (
				<Table className="mb-12">
					<TableHeader className="h-20 border-y border-black-neutral/20 bg-white">
						<TableRow className="[&_th]:text-center">
							<TableHead>User ID</TableHead>
							<TableHead>Questionnaires completed</TableHead>
							<TableHead>Total rewards Earned</TableHead>
							<TableHead>Daily rewards Earned</TableHead>
							<TableHead>User Location</TableHead>
							<TableHead>User SES</TableHead>
							<TableHead>Total Ratings</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="[&_tr:nth-child(even)]:bg-white [&_tr:nth-child(odd)]:bg-transparent">
						{data?.data?.data.map((user, index) => (
							<TableRow
								key={`user-${index}`}
								className="cursor-pointer border-black-neutral/20 text-center odd:hover:bg-neutral-100 even:hover:bg-neutral-100/50"
								onClick={() =>
									router.push(
										urls.dashboard.users_report.single_user(user.id.toString())
									)
								}
							>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.questionnaires}</TableCell>
								<TableCell>{user.totalRewards}</TableCell>
								<TableCell>{user.dailyRewards}</TableCell>
								<TableCell>{user.location}</TableCell>
								<TableCell>{user.ses}</TableCell>
								<TableCell>{user.totalRatings}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</section>
	);
};

export default UsersReportPage;
