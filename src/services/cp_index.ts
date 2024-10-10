import {
	GetCPICountryResponse,
	GetCPIndexUploadHistoryResponse,
	GetCPIResponse,
	UploadCPIndexResponse,
} from "@/types/response";
import { Fetch, methods } from ".";

async function getAll(year: number, country: string, token: string) {
	return await Fetch<GetCPIResponse>(
		`/admin/cpi?country=${country}&year=${year}`,
		token
	);
}

async function getSupportedCPICountries(token: string) {
	return await Fetch<GetCPICountryResponse>(`/admin/cpi/countries`, token);
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
	getSupportedCPICountries,
	getUploadHistory,
	upload,
};
