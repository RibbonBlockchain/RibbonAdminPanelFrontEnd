import { GetUsersActivitiesResponse } from "@/types/response";
import { Fetch } from ".";

async function getUsersActivities(
	input: {
		q?: string;
		page?: string;
		pageSize?: string;
	},
	token: string
) {
	return await Fetch<GetUsersActivitiesResponse>(
		`/admin/report/activities?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "50")}`,
		token
	);
}

export const usersReportService = {
	getUsersActivities,
};
