import { client } from "@/lib/api-client";
import { LoginSchemaType } from "@/schemas";
import { LoginResponse, UserProfileResponse } from "@/types/response";

// const token = await getToken({
// 	cookieName: "token",
// 	req: undefined,
// });

async function login(data: LoginSchemaType) {
	return (await client.post<LoginResponse>("/admin/login", data)).data;
}

async function getProfile(token?: string) {
	return (
		await client<UserProfileResponse>({
			method: "get",
			url: "/auth",
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
