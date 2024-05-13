"use client";

import React from "react";
import StatusToggler from "@/components/status_toggler";
import { taskService } from "@/services/tasks";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/components/providers/token";

const TaskStatusToggle = () => {
	const { token } = useToken();

	const { data } = useQuery({
		queryKey: ["task summary"],
		queryFn: () => taskService.getSummary(token || ""),
		enabled: !!token,
	});

	return (
		<div className="flex w-full items-center justify-end gap-4">
			<StatusToggler
				count={data?.data?.count.active || 0}
				title={"Active"}
				action_status={"ACTIVE"}
			/>
			<StatusToggler
				count={data?.data?.count.closed || 0}
				title={"Closed"}
				action_status={"CLOSED"}
			/>
		</div>
	);
};

export default TaskStatusToggle;
