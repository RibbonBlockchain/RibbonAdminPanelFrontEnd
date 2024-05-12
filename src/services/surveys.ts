import { Fetch, methods } from ".";
import { CreateSurveyRequest } from "@/types/request";
import { CreateSurveyResponse, GetSurveyResponse } from "@/types/response";

async function getAll(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await Fetch<GetSurveyResponse>(
		`/admin/survey?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}

async function createSurvey(input: CreateSurveyRequest, token: string) {
	return await Fetch<CreateSurveyResponse>("/admin/survey", token, {
		method: methods.POST,
		body: JSON.stringify(input),
	});
}

async function uploadSurvey(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await Fetch<CreateSurveyResponse>("/admin/survey/upload", token, {
		method: methods.POST,
		body: formData,
	});
}

export const surveyService = {
	getAll,
	createSurvey,
	uploadSurvey,
};
