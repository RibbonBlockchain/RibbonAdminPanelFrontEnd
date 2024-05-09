import { GetQuestionnaireCategoryResponse } from "@/types/response";
import { client } from "@/lib/api-client";

async function getAllQuestionnaireCategory(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await client.get<GetQuestionnaireCategoryResponse>(
		`/admin/questionnaire/category?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}
async function getAllSurveyCategory(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await client.get<GetQuestionnaireCategoryResponse>(
		`/admin/survey/category?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}
async function getAllTaskCategory(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await client.get<GetQuestionnaireCategoryResponse>(
		`/admin/task/category?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export const categoriesService = {
	getAllQuestionnaireCategory,
	getAllSurveyCategory,
	getAllTaskCategory,
};
