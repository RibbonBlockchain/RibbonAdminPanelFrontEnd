"use client";

import { client } from "@/lib/api-client";
import { SendNotificationSchemaType } from "@/schemas";
import { SendNotificationResponse } from "@/types/response";

async function sendMessage(data: SendNotificationSchemaType) {
	return await client.post<SendNotificationResponse>(
		"/notification/send-general",
		data
	);
}

export const sendNotificationService = {
	sendMessage,
};
