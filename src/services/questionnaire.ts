import { client } from "@/lib/api-client";
import { GetQuestionnaireResponse } from "@/types/response";

async function getAll(token: string) {
	return await client.get<GetQuestionnaireResponse>("/admin/questionnaire", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export const questionnaireService = {
	getAll,
};
