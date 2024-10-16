import { getErrorMessage } from "@/lib/utils";
import { signOut } from "next-auth/react";

export async function Fetch<T>(
	url: string,
	token?: string,
	init?: RequestInit,
	noHeaders: boolean = false
) {
	const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API.concat(url), {
		...init,
		headers: noHeaders
			? {
					authorization: `Bearer ${token}`,
					...init?.headers,
				}
			: {
					authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
					...init?.headers,
				},
	});

	const data = (await res.json()) as T;

	if (!res.ok) {
		if (res.status === 401) {
			console.log(
				`\n ============== Unauthorized request: ${url} ============== \n`
			);
			await signOut({ redirect: true, callbackUrl: window.location.href });
		}

		throw new Error(getErrorMessage(data));
	}

	return data;
}

export const methods = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	PATCH: "PATCH",
	DELETE: "DELETE",
};
