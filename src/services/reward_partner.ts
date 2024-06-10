import {
	CreateVaultResponse,
	GetRewardPartnerByIdResponse,
	GetRewardPartnersResponse,
} from "@/types/response";
import { Fetch, methods } from ".";
import { CreateVaultRequest, TransferToVaultRequest } from "@/types/request";

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

async function getById(id: string | number, token: string) {
	return await Fetch<GetRewardPartnerByIdResponse>(
		`/admin/reward-partner/${id}`,
		token
	);
}

async function createVault(input: CreateVaultRequest, token: string) {
	return await Fetch<CreateVaultResponse>("/admin/create-vault", token, {
		method: methods.POST,
		body: JSON.stringify({
			amount: String(input.amount * 10 ** -18),
			address: input.address,
		}),
	});
}

async function transferToVault(input: TransferToVaultRequest, token: string) {
	return await Fetch<CreateVaultResponse>("/admin/wallet-transfer", token, {
		method: methods.POST,
		body: JSON.stringify({
			amount: String(input.amount * 10 ** -18),
		}),
	});
}

export const rewardPartnerService = {
	getAll,
	getById,
	createVault,
	transferToVault,
};
