import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDate, formatTime, getTimeAgo } from "@/lib/utils";
import React from "react";

const header = ["User", "File name", "Time", "Date"];

const data = [
	{
		name: "Gugu Newman",
		filename: "January CPI update.xlsx",
		time: formatTime("2022-01-01T00:00:00.000Z"),
		date: formatDate("2022-01-01T00:00:00.000Z"),
	},
];

const CpIndexUploadHistoryTable = () => {
	return (
		<Table>
			<TableHeader className="bg-primary-500">
				<TableRow className="border-none ">
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
				{data.map((x, i) => (
					<TableRow key={`country-cpi-${i}`}>
						<TableCell className="border  border-primary/20 text-center">
							<span>{x.name}</span>
						</TableCell>
						<TableCell className="border border-primary/20 text-center">
							{x.filename}
						</TableCell>
						<TableCell className="border border-primary/20 text-center">
							{x.time}
						</TableCell>
						<TableCell className="border border-primary/20 text-center">
							{x.date}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default CpIndexUploadHistoryTable;
