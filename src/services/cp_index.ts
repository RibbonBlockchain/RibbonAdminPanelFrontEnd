import {
	GetCPIndexResponse,
	GetCPIndexUploadHistoryResponse,
	UploadCPIndexResponse,
} from "@/types/response";
import { Fetch, methods } from ".";

async function getAll(year: number, token: string) {
	return await Fetch<GetCPIndexResponse>(`/admin/cpi?year=${year}`, token);
}
async function getUploadHistory(token: string) {
	return await Fetch<GetCPIndexUploadHistoryResponse>(
		`/admin/cpi-history`,
		token
	);
}

async function upload(file: File, token: string) {
	const formData = new FormData();
	formData.append("file", file);

	return await Fetch<UploadCPIndexResponse>(
		"/admin/cpi/upload",
		token,
		{
			method: methods.POST,
			body: formData,
		},
		true
	);
}

export const cpIndexService = {
	getAll,
	getUploadHistory,
	upload,
};
