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

	if (!response.ok) {
		throw new Error((await response.json()).message || "Something went wrong");
	}

	return (await response.json()) as UserProfileResponse;
}
