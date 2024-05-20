import { Fetch } from ".";
import {
	DownloadSystemReportResponse,
	GetAllRewardsReportResponse,
	GetAllUsersReportResponse,
	GetAllTaskActivityReportResponse,
	GetAllSurveyActivityReportResponse,
	GetAllQuestionnaireActivityReportResponse,
} from "@/types/response";

async function downloadSystemReport(token: string) {
	return await Fetch<DownloadSystemReportResponse>(
		"/admin/report/downloads",
		token
	);
}

async function getAllRewardReports(token: string) {
	return await Fetch<GetAllRewardsReportResponse>(
		"/admin/report/rewards",
		token
	);
}

async function getAllUserReports(token: string) {
	return await Fetch<GetAllUsersReportResponse>("/admin/report/users", token);
}

async function getAllTaskActivityReports(token: string) {
	return await Fetch<GetAllTaskActivityReportResponse>(
		"/admin/report/activities/task",
		token
	);
}

async function getAllSurveyActivityReports(token: string) {
	return await Fetch<GetAllSurveyActivityReportResponse>(
		"/admin/report/activities/survey",
		token
	);
}

async function getAllQuestionnaireActivityReports(token: string) {
	return await Fetch<GetAllQuestionnaireActivityReportResponse>(
		"/admin/report/activities/questionnaire",
		token
	);
}

export const reportService = {
	downloadSystemReport,
	getAllRewardReports,
	getAllUserReports,
	getAllTaskActivityReports,
	getAllSurveyActivityReports,
	getAllQuestionnaireActivityReports,
};
