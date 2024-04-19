"use client";

import { UserProfileResponse } from "@/types/response";

export async function getUserProfile() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong", {
			cause: data,
		});
	}

	return data as UserProfileResponse;
}
