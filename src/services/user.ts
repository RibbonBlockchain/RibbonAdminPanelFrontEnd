"use client";

import { UserProfileResponse } from "@/types/response";
import { myFetch } from ".";
import axios from "axios";

// const token =

async function getProfile(token?: string) {
	return (
		await axios.get<UserProfileResponse>(
			process.env.NEXT_PUBLIC_BACKEND_API.concat("/auth")
		)
	).data;
}

export const userService = {
	getProfile,
};
