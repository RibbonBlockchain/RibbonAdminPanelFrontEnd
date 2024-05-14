import { GetDashboardSummaryResponse } from "@/types/response";
import { Fetch } from ".";

async function getSummary(token: string) {
	return await Fetch<GetDashboardSummaryResponse>(
		`/admin/dashboard/summary`,
		token
	);
}

export const dashboardService = {
	getSummary,
};
