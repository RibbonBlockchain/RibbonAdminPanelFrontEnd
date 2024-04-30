import { client } from "@/lib/api-client";
import {
	GetQuestionnaireCategoryResponse,
	GetQuestionnaireResponse,
} from "@/types/response";
import { CreateQuestionnaireRequest } from "@/types/request";

async function getAll(token: string) {
	return await client.get<GetQuestionnaireResponse>("/admin/questionnaire", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

async function createQuestionnaire(
	input: CreateQuestionnaireRequest,
	token: string
) {
	return await client.post<GetQuestionnaireCategoryResponse>(
		"/admin/questionnaire",
		input,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

async function uploadQuestionnaire(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await client.post("/admin/questionnaire/upload", formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export const questionnaireService = {
	getAll,
	createQuestionnaire,
	uploadQuestionnaire,
};
