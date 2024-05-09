import axios from "axios";
import urls from "./urls";
import { getServerSession } from "next-auth";
import { getErrorMessage } from "./utils";
import { redirect } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API;

export const client = axios.create({ baseURL });

client.interceptors.response.use((response) => {
	console.error({ status: response.status });
	if (response.status === 401) {
		window.location.href = urls.auth.login(
			`callbackUrl=${window.location.href}`
		);
	}
	return response;
});

export async function Fetch<T>(url: string, init?: RequestInit) {
	const token = await getServerSession()?.then(
		(session) => session?.user?.apiToken
	);

	const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API.concat(url), {
		headers: {
			authorization: `Bearer ${token}`,
			"Content-Type": "Application/json",
		},
		...init,
	});

	const data = (await res.json()) as T;

	if (!res.ok) {
		if (res.status === 401) {
			if (window) {
				window.location.href = urls.auth.login();
			} else {
				redirect(urls.auth.login());
			}
		}

		throw new Error(getErrorMessage(data));
	}

	return data;
}
