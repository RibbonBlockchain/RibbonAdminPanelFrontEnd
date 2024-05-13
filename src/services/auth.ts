import { Fetch, methods } from ".";
import { LoginSchemaType } from "@/schemas";
import { LoginResponse, UserProfileResponse } from "@/types/response";

async function login(data: LoginSchemaType) {
	return await Fetch<LoginResponse>("/admin/login", "", {
		method: methods.POST,
		body: JSON.stringify(data),
	});
}

async function getProfile(token: string) {
	return await Fetch<UserProfileResponse>("/auth", token);
}

export const authService = {
	login,
	getProfile,
};
