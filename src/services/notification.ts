import { Fetch, methods } from ".";
import { SendNotificationSchemaType } from "@/schemas";
import {
	SendNotificationResponse,
	GetNotificationHistoryResponse,
} from "@/types/response";

async function getAll(
	input: {
		q?: string;
		page?: string;
		pageSize?: string;
	},
	token: string
) {
	return await Fetch<GetNotificationHistoryResponse>(
		`/admin/notifications?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}
async function sendMessage(data: SendNotificationSchemaType, token: string) {
	return await Fetch<SendNotificationResponse>(
		"/notification/send-general",
		token,
		{
			method: methods.POST,
			body: JSON.stringify(data),
		}
	);
}

export const notificationService = {
	getAll,
	sendMessage,
};
