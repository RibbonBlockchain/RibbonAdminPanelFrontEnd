import { Fetch, methods } from ".";
import { InviteUserSchemaType } from "@/schemas";
import { InviteUserResponse } from "@/types/response";

async function inviteUser(data: InviteUserSchemaType, token: string) {
	return await Fetch<InviteUserResponse>("/admin/user/invite", token, {
		method: methods.POST,
		body: JSON.stringify(data),
	});
}

export const userService = {
	inviteUser,
};
