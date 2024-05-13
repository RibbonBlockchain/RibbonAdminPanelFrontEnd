import { Fetch, methods } from ".";
import {
	GetQuestionnaireResponse,
	CreateQuestionnaireResponse,
	GetQuestionnaireByIdResponse,
	GetSummaryResponse,
} from "@/types/response";
import {
	CreateQuestionnaireRequest,
	EditQuestionnaireRequest,
	UpdateSesScoreRequest,
	UpdateStatusRequest,
} from "@/types/request";

async function getAll(
	input: {
		q?: string;
		page?: string;
		pageSize?: string;
		status?: "ACTIVE" | "CLOSED";
	},
	token: string
) {
	return await Fetch<GetQuestionnaireResponse>(
		`/admin/questionnaire?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}&status=${input.status || "ACTIVE"}`,
		token
	);
}

async function getById(id: string, token: string) {
	return await Fetch<GetQuestionnaireByIdResponse>(
		`/admin/questionnaire/${id}`,
		token
	);
}

async function getSummary(token: string) {
	return await Fetch<GetSummaryResponse>("/admin/questionnaire/summary", token);
}

async function create(input: CreateQuestionnaireRequest, token: string) {
	return await Fetch<CreateQuestionnaireResponse>(
		"/admin/questionnaire",
		token,
		{
			method: methods.POST,
			body: JSON.stringify(input),
		}
	);
}

async function edit(input: EditQuestionnaireRequest, token: string) {
	return await Fetch<CreateQuestionnaireResponse>(
		"/admin/questionnaire",
		token,
		{
			method: methods.PATCH,
			body: JSON.stringify(input),
		}
	);
}

async function updateSesScore(input: UpdateSesScoreRequest, token: string) {
	return await Fetch<CreateQuestionnaireResponse>(
		"/admin/questionnaire/ses",
		token,
		{
			method: methods.PATCH,
			body: JSON.stringify(input),
		}
	);
}
async function updateStatus(input: UpdateStatusRequest, token: string) {
	return await Fetch<CreateQuestionnaireResponse>(
		"/admin/questionnaire/status",
		token,
		{
			method: methods.PATCH,
			body: JSON.stringify(input),
		}
	);
}

async function upload(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await Fetch<CreateQuestionnaireResponse>(
		"/admin/questionnaire/upload",
		token,
		{
			method: methods.POST,
			body: formData,
		},
		true
	);
}

export const questionnaireService = {
	getAll,
	getById,
	getSummary,
	create,
	edit,
	updateSesScore,
	updateStatus,
	upload,
};
