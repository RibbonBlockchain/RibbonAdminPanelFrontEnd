"use client";

import React from "react";
import StatusToggler from "@/components/status_toggler";
import { questionnaireService } from "@/services/questionnaire";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/components/providers/token";

const QuestionnaireStatusToggle = () => {
	const { token } = useToken();

	const { data } = useQuery({
		queryKey: ["questionnaire summary"],
		queryFn: () => questionnaireService.getSummary(token || ""),
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

export default QuestionnaireStatusToggle;
