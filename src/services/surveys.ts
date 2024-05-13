import { Fetch, methods } from ".";
import {
	CreateSurveyRequest,
	EditSurveyRequest,
	UpdateSesScoreRequest,
	UpdateStatusRequest,
} from "@/types/request";
import {
	GetSurveyResponse,
	GetSurveyByIdResponse,
	GetSummaryResponse,
	CreateSurveyResponse,
} from "@/types/response";

async function getAll(
	input: {
		q?: string;
		page?: string;
		pageSize?: string;
		status?: "ACTIVE" | "CLOSED";
	},
	token: string
) {
	return await Fetch<GetSurveyResponse>(
		`/admin/survey?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}&status=${input.status || "ACTIVE"}`,
		token
	);
}

async function getById(id: string, token: string) {
	return await Fetch<GetSurveyByIdResponse>(`/admin/survey/${id}`, token);
}

async function getSummary(token: string) {
	return await Fetch<GetSummaryResponse>("/admin/survey/summary", token);
}

async function create(input: CreateSurveyRequest, token: string) {
	return await Fetch<CreateSurveyResponse>("/admin/survey", token, {
		method: methods.POST,
		body: JSON.stringify(input),
	});
}

async function edit(input: EditSurveyRequest, token: string) {
	return await Fetch<CreateSurveyResponse>("/admin/survey", token, {
		method: methods.PATCH,
		body: JSON.stringify(input),
	});
}

async function updateSesScore(input: UpdateSesScoreRequest, token: string) {
	return await Fetch<CreateSurveyResponse>("/survey/update-ses", token, {
		method: methods.PATCH,
		body: JSON.stringify(input),
	});
}
async function updateStatus(input: UpdateStatusRequest, token: string) {
	return await Fetch<CreateSurveyResponse>("/admin/survey/status", token, {
		method: methods.PATCH,
		body: JSON.stringify(input),
	});
}

async function upload(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await Fetch<CreateSurveyResponse>(
		"/admin/survey/upload",
		token,
		{
			method: methods.POST,
			body: formData,
		},
		true
	);
}

export const surveyService = {
	getAll,
	getById,
	getSummary,
	create,
	edit,
	updateSesScore,
	updateStatus,
	upload,
};
