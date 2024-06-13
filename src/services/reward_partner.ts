import {
	CreateVaultResponse,
	GetRewardPartnerByIdResponse,
	GetRewardPartnersResponse,
} from "@/types/response";
import { Fetch, methods } from ".";
import { CreateVaultRequest, TransferToVaultRequest } from "@/types/request";
import { parseUnits } from "ethers";

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

async function getFundingHistory(id: string, token: string) {
	return await Fetch<CreateVaultResponse>(`/admin/wallet/history`, token);
}

async function createVault(input: CreateVaultRequest, token: string) {
	return await Fetch<CreateVaultResponse>("/admin/create-vault", token, {
		method: methods.POST,
		body: JSON.stringify({
			points: parseUnits(input.points.toString(), 18).toString(),
			address: input.address,
		}),
	});
}

async function transferToVault(input: TransferToVaultRequest, token: string) {
	return await Fetch<CreateVaultResponse>("/admin/wallet-transfer", token, {
		method: methods.POST,
		body: JSON.stringify({
			amount: parseUnits(input.amount.toString(), 18).toString(),
		}),
	});
}

export const rewardPartnerService = {
	getAll,
	getById,
	getFundingHistory,
	createVault,
	transferToVault,
};
