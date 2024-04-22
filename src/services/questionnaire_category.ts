"use client";

import { GetQuestionnaireCategoryResponse } from "@/types/response";
import { myFetch } from ".";

class QuestionnaireCategoryService {
	constructor() {}
	async getAll() {
		return await myFetch<GetQuestionnaireCategoryResponse>(
			`/admin/questionnaire/category`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			}
		);
	}
}

export const questionnaireCategoryService = new QuestionnaireCategoryService();
