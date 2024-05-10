import {
	GetQuestionnaireCategoryResponse,
	CreateCategoryResponse,
} from "@/types/response";
import { Fetch } from ".";

// NOTE: QUESTIONNAIRE CATEGORIES
async function getAllQuestionnaireCategory(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await Fetch<GetQuestionnaireCategoryResponse>(
		`/admin/questionnaire/category?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}

async function createQuestionnaireCategory(
	input: { name: string },
	token: string
) {
	return await Fetch<CreateCategoryResponse>(
		"/admin/questionnaire/category",
		token,
		{
			method: "POST",
			body: JSON.stringify(input),
		}
	);
}

// NOTE: SURVEY CATEGORIES
async function getAllSurveyCategory(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await Fetch<GetQuestionnaireCategoryResponse>(
		`/admin/survey/category?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}

async function createSurveyCategory(input: { name: string }, token: string) {
	return await Fetch<CreateCategoryResponse>("/admin/survey/category", token, {
		method: "POST",
		body: JSON.stringify(input),
	});
}

// NOTE: TASK CATEGORIES
async function getAllTaskCategory(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await Fetch<GetQuestionnaireCategoryResponse>(
		`/admin/task/category?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}

async function createTaskCategory(input: { name: string }, token: string) {
	return await Fetch<CreateCategoryResponse>("/admin/task/category", token, {
		method: "POST",
		body: JSON.stringify(input),
	});
}

export const categoriesService = {
	getAllQuestionnaireCategory,
	createQuestionnaireCategory,
	getAllSurveyCategory,
	createSurveyCategory,
	getAllTaskCategory,
	createTaskCategory,
};
