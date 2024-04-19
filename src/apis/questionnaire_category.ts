"use client";

import { GetQuestionnaireCategoryResponse } from "@/types/response";

export async function getTasks() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/task`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	const data = (await response.json()) as GetQuestionnaireCategoryResponse;

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong", {
			cause: data,
		});
	}

	return data;
}
