"use client";

import { useToken } from "@/components/providers/token";
import ErrorScreen from "@/components/sections/error";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDate, formatTime } from "@/lib/utils";
import { cpIndexService } from "@/services/cp_index";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const header = ["User", "File name", "Time", "Date"];

const CpIndexUploadHistoryTable = () => {
	const { token } = useToken();

	const { data, isPending, error, refetch } = useQuery({
		queryKey: ["cp-index upload history"],
		queryFn: () => cpIndexService.getUploadHistory(token || ""),
		enabled: !!token,
	});

	if (isPending) return <p className="px-4">Loading...</p>;

	if (error) return <ErrorScreen error={error} reset={refetch} />;

	if (!data.data || data.data.length === 0)
		return <p className="px-4">No data</p>;

	return (
		<Table>
			<TableHeader className="bg-primary-500 ">
				<TableRow className="border-none hover:bg-transparent">
					{header.map((x, i) => (
						<TableHead
							key={`month-header-${i}`}
							className="h-14 text-center text-white"
						>
							{x}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.data.map((x, i) => (
					<TableRow key={`country-cpi-${i}`}>
						<TableCell className="border  border-primary/20 text-center">
							<span>
								{x?.user?.firstName} {x?.user?.lastName}
							</span>
						</TableCell>
						<TableCell className="border border-primary/20 text-center">
							{x.fileName}
						</TableCell>
						<TableCell className="border border-primary/20 text-center">
							{formatTime(x.createdAt)}
						</TableCell>
						<TableCell className="border border-primary/20 text-center">
							{formatDate(x.createdAt)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default CpIndexUploadHistoryTable;
