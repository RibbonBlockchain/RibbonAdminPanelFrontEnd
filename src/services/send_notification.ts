import { Fetch, methods } from ".";
import { SendNotificationSchemaType } from "@/schemas";
import { SendNotificationResponse } from "@/types/response";

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

export const sendNotificationService = {
	sendMessage,
};
