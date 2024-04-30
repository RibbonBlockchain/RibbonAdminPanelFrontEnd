import { GetQuestionnaireCategoryResponse } from "@/types/response";
import { client } from "@/lib/api-client";

async function getAll(token: string) {
	return await client.get<GetQuestionnaireCategoryResponse>(
		"/admin/questionnaire/category",
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export const questionnaireCategoryService = {
	getAll,
};
