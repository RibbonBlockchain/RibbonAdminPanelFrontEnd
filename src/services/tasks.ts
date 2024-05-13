import { Fetch, methods } from ".";
import { CreateTaskRequest } from "@/types/request";
import { CreateTaskResponse, GetTasksResponse } from "@/types/response";

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

async function createTasks(input: CreateTaskRequest, token: string) {
	return await Fetch<CreateTaskResponse>("/admin/task", token, {
		method: methods.POST,
		body: JSON.stringify(input),
	});
}

async function uploadTask(file: File, token: string) {
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
	createTasks,
	uploadTask,
};
