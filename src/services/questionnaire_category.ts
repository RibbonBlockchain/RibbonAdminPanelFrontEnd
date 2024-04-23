import { GetQuestionnaireCategoryResponse } from "@/types/response";
import { client } from "@/lib/api-client";
import { CreateQuestionnaireRequest } from "@/types/request";

async function getAll(token: string) {
	return await client.get<GetQuestionnaireCategoryResponse>(
		"/admin/questionnaire/category",
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

async function createQuestionnaire(
	input: CreateQuestionnaireRequest,
	token: string
) {
	return await client.post<GetQuestionnaireCategoryResponse>(
		"/admin/questionnaire/questions",
		input,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export const questionnaireCategoryService = {
	getAll,
	createQuestionnaire,
};
