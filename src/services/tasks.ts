import { client } from "@/lib/api-client";
import { CreateTaskRequest } from "@/types/request";
import { CreateTaskResponse, GetTasksResponse } from "@/types/response";

async function getAll(
	input: { q?: string; page?: string; pageSize?: string },
	token: string
) {
	return await client.get<GetTasksResponse>(
		`/admin/task?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

async function createTasks(input: CreateTaskRequest, token: string) {
	return await client.post<CreateTaskResponse>("/admin/task", input, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

async function uploadTask(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await client.post("/admin/task/upload", formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export const taskService = {
	getAll,
	createTasks,
	uploadTask,
};
