import { client } from "@/lib/api-client";
import { CreateSurveyRequest } from "@/types/request";
import { CreateSurveyResponse, GetSurveyResponse } from "@/types/response";

async function getAll(token: string) {
	return await client.get<GetSurveyResponse>("/admin/surveys", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

async function createSurvey(input: CreateSurveyRequest, token: string) {
	return await client.post<CreateSurveyResponse>(
		"/admin/questionnaire",
		input,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

async function uploadSurvey(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await client.post("/admin/questionnaire/upload", formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export const surveyService = {
	getAll,
	createSurvey,
	uploadSurvey,
};
