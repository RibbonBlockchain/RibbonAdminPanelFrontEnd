import { Fetch, methods } from ".";
import {
	CreateTaskRequest,
	EditTaskRequest,
	UpdateSesScoreRequest,
	UpdateStatusRequest,
} from "@/types/request";
import {
	GetTasksResponse,
	GetTaskByIdResponse,
	GetSummaryResponse,
	CreateTaskResponse,
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
	return await Fetch<GetTasksResponse>(
		`/admin/task?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}&status=${input.status || "ACTIVE"}`,
		token
	);
}

async function getById(id: string, token: string) {
	return await Fetch<GetTaskByIdResponse>(`/admin/task/${id}`, token);
}

async function getSummary(token: string) {
	return await Fetch<GetSummaryResponse>("/admin/task/summary", token);
}

async function create(input: CreateTaskRequest, token: string) {
	return await Fetch<CreateTaskResponse>("/admin/task", token, {
		method: methods.POST,
		body: JSON.stringify(input),
	});
}

async function edit(input: EditTaskRequest, token: string) {
	return await Fetch<CreateTaskResponse>("/admin/task", token, {
		method: methods.PATCH,
		body: JSON.stringify(input),
	});
}

async function updateSesScore(input: UpdateSesScoreRequest, token: string) {
	return await Fetch<CreateTaskResponse>("/task/update-ses", token, {
		method: methods.PATCH,
		body: JSON.stringify(input),
	});
}
async function updateStatus(input: UpdateStatusRequest, token: string) {
	return await Fetch<CreateTaskResponse>("/admin/task/status", token, {
		method: methods.PATCH,
		body: JSON.stringify(input),
	});
}

async function upload(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await Fetch<CreateTaskResponse>(
		"/admin/task/upload",
		token,
		{
			method: methods.POST,
			body: formData,
		},
		true
	);
}

export const taskService = {
	getAll,
	getById,
	getSummary,
	create,
	edit,
	updateSesScore,
	updateStatus,
	upload,
};
