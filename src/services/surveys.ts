import { client } from "@/lib/api-client";
import { CreateSurveyRequest } from "@/types/request";
import { CreateSurveyResponse, GetSurveyResponse } from "@/types/response";

async function getAll(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await client.get<GetSurveyResponse>(
		`/admin/survey?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

async function createSurvey(input: CreateSurveyRequest, token: string) {
	return await client.post<CreateSurveyResponse>("/admin/survey", input, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

async function uploadSurvey(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await client.post("/admin/survey/upload", formData, {
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
