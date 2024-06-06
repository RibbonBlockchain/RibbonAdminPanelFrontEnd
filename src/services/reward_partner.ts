import {
	CreateVaultResponse,
	GetRewardPartnersResponse,
} from "@/types/response";
import { Fetch, methods } from ".";

async function getAll(
	input: {
		q?: string;
		page?: string;
		pageSize?: string;
	},
	token: string
) {
	return await Fetch<GetRewardPartnersResponse>(
		`/admin/reward-partner?q=${input.q || ""}&page=${parseInt(input.page || "1")}&pageSize=${parseInt(input.pageSize || "10")}`,
		token
	);
}

async function createVault(token: string) {
	return await Fetch<CreateVaultResponse>("/admin/create-vault", token, {
		method: methods.POST,
	});
}

export const rewardPartnerService = {
	getAll,
	createVault,
};
