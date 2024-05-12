import { Fetch, methods } from ".";
import {
	GetQuestionnaireResponse,
	CreateQuestionnaireResponse,
	GetQuestionnaireByIdResponse,
} from "@/types/response";
import { CreateQuestionnaireRequest } from "@/types/request";

async function getAll(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await Fetch<GetQuestionnaireResponse>(
		`/admin/questionnaire?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}

async function getById(id: string, token: string) {
	return await Fetch<GetQuestionnaireByIdResponse>(
		`/admin/questionnaire/${id}`,
		token
	);
}

async function createQuestionnaire(
	input: CreateQuestionnaireRequest,
	token: string
) {
	return await Fetch<CreateQuestionnaireResponse>(
		"/admin/questionnaire",
		token,
		{
			method: methods.POST,
			body: JSON.stringify(input),
		}
	);
}

async function editQuestionnaire(
	input: CreateQuestionnaireRequest & { id: string },
	token: string
) {
	return await Fetch<CreateQuestionnaireResponse>(
		"/admin/questionnaire",
		token,
		{
			method: methods.PATCH,
			body: JSON.stringify(input),
		}
	);
}

async function uploadQuestionnaire(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await Fetch<CreateQuestionnaireResponse>(
		"/admin/questionnaire/upload",
		token,
		{
			method: methods.POST,
			body: formData,
		}
	);
}

export const questionnaireService = {
	getAll,
	getById,
	createQuestionnaire,
	editQuestionnaire,
	uploadQuestionnaire,
};
