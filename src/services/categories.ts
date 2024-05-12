import {
	GetCategoriesResponse,
	CreateCategoryResponse,
	GetCategoryByIdResponse,
} from "@/types/response";
import { Fetch, methods } from ".";

// NOTE: QUESTIONNAIRE CATEGORIES
async function getQuestionnaireCategories(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await Fetch<GetCategoriesResponse>(
		`/admin/questionnaire/category?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}

async function getQuestionnaireCategoryById(id: string, token: string) {
	return await Fetch<GetCategoryByIdResponse>(
		`/admin/questionnaire/category/${id}`,
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
			method: methods.POST,
			body: JSON.stringify(input),
		}
	);
}

// NOTE: SURVEY CATEGORIES
async function getSurveyCategories(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await Fetch<GetCategoriesResponse>(
		`/admin/survey/category?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}

async function getSurveyCategoryById(id: string, token: string) {
	return await Fetch<GetCategoryByIdResponse>(
		`/admin/questionnaire/survey/${id}`,
		token
	);
}

async function createSurveyCategory(input: { name: string }, token: string) {
	return await Fetch<CreateCategoryResponse>("/admin/survey/category", token, {
		method: methods.POST,
		body: JSON.stringify(input),
	});
}

// NOTE: TASK CATEGORIES
async function getTaskCategories(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await Fetch<GetCategoriesResponse>(
		`/admin/task/category?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}

async function getTaskCategoryById(id: string, token: string) {
	return await Fetch<GetCategoryByIdResponse>(
		`/admin/questionnaire/task/${id}`,
		token
	);
}

async function createTaskCategory(input: { name: string }, token: string) {
	return await Fetch<CreateCategoryResponse>("/admin/task/category", token, {
		method: methods.POST,
		body: JSON.stringify(input),
	});
}

export const categoriesService = {
	getQuestionnaireCategories,
	createQuestionnaireCategory,
	getSurveyCategories,
	createSurveyCategory,
	getTaskCategories,
	createTaskCategory,

	// NOTE: GET BY ID may not be needed
	getQuestionnaireCategoryById,
	getSurveyCategoryById,
	getTaskCategoryById,
};
