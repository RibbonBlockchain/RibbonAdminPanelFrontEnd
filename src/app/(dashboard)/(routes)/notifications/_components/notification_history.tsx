"use client";

import { useToken } from "@/components/providers/token";
import ErrorScreen from "@/components/sections/error";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { formatTime, formatDate } from "@/lib/utils";
import { notificationService } from "@/services/notification";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
	searchParams: {
		q?: string;
		page?: string;
		pageSize?: string;
	};
};

const NotificationHistory: React.FC<Props> = (props) => {
	const { token } = useToken();

	const { data, error, refetch, isPending } = useQuery({
		queryKey: ["notifications", props.searchParams],
		queryFn: () => notificationService.getAll(props.searchParams, token || ""),
		enabled: !!token,
	});

	if (isPending) return <div className="mx-auto max-w-3xl p-4">Loading...</div>;

	if (error) return <ErrorScreen error={error} reset={refetch} />;

	return (
		<section className="mx-auto max-w-3xl">
			<h2 className="text-xl font-semibold">Notification History</h2>

			<Table>
				<TableHeader className="h-20 border-b border-black-neutral/20 bg-white">
					<TableRow className="text-left capitalize">
						<TableHead>sender</TableHead>
						<TableHead>title</TableHead>
						<TableHead>Message</TableHead>
						<TableHead>time</TableHead>
						<TableHead>date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="[&_tr:nth-child(even)]:bg-white [&_tr:nth-child(odd)]:bg-transparent">
					{data?.data &&
						data?.data.map((notification, index) => (
							<TableRow
								key={`program-${index}`}
								className="border-black-neutral/20 hover:bg-transparent"
							>
								<TableCell className="text-sm font-normal">
									{notification.user?.firstName || notification.user?.lastName
										? `${notification.user?.firstName} ${notification.user?.lastName}`
										: "N/A"}
								</TableCell>
								<TableCell className="text-sm font-normal">
									{notification.title}
								</TableCell>
								<TableCell className="text-sm font-normal">
									{notification.message}
								</TableCell>
								<TableCell className="text-sm font-normal">
									{formatTime(notification.createdAt)}
								</TableCell>
								<TableCell className="text-sm font-normal">
									{formatDate(notification.createdAt)}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</section>
	);
};

export default NotificationHistory;
