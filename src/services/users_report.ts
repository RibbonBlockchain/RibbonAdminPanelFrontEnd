import {
	GetUsersActivitiesQuestionnaireResponse,
	GetUsersActivitiesResponse,
} from "@/types/response";
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

async function getUsersActivitiesQuestionnaires(
	id: number | string,
	token: string
) {
	return await Fetch<GetUsersActivitiesQuestionnaireResponse>(
		`/admin/report/activities/user/${id}/questionnaire`,
		token
	);
}
async function getUsersActivitiesSurveys(id: number | string, token: string) {
	return await Fetch<GetUsersActivitiesQuestionnaireResponse>(
		`/admin/report/activities/user/${id}/survey`,
		token
	);
}
async function getUsersActivitiesTasks(id: number | string, token: string) {
	return await Fetch<GetUsersActivitiesQuestionnaireResponse>(
		`/admin/report/activities/user/${id}/task`,
		token
	);
}

export const usersReportService = {
	getUsersActivities,
	getUsersActivitiesQuestionnaires,
	getUsersActivitiesSurveys,
	getUsersActivitiesTasks,
};
