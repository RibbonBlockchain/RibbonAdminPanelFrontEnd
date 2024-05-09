import { client } from "@/lib/api-client";
import { LoginSchemaType } from "@/schemas";
import { LoginResponse, UserProfileResponse } from "@/types/response";

async function login(data: LoginSchemaType) {
	return (await client.post<LoginResponse>("/admin/login", data)).data;
}

async function getProfile(token?: string) {
	return (
		await client.get<UserProfileResponse>("/auth", {
			headers: {
				Authorization: token ? `Bearer ${token}` : "",
			},
		})
	).data;
}

export const authService = {
	login,
	getProfile,
};
