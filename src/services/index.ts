export async function myFetch<T>(url: string, options?: RequestInit) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_API}${url}`,
		options
	);

	if (!res.ok) {
		throw new Error((await res.json()).message || "Something went wrong");
	}

	const resData = (await res.json()) as T;

	return resData;
}
