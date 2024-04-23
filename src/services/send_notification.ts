import { client } from "@/lib/api-client";
import { SendNotificationSchemaType } from "@/schemas";
import { SendNotificationResponse } from "@/types/response";

async function sendMessage(data: SendNotificationSchemaType, token: string) {
	return await client.post<SendNotificationResponse>(
		"/notification/send-general",
		data,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export const sendNotificationService = {
	sendMessage,
};
