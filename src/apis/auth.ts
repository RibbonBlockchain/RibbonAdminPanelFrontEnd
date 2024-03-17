import { LoginSchemaType } from "@/schemas";
import { LoginResponse } from "@/types/response";

export async function Login(data: LoginSchemaType) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
	);

	if (!response.ok) {
		throw new Error((await response.json()).message || "Something went wrong");
	}

	const { data: resData } = (await response.json()) as LoginResponse;

	console.log(resData);

	localStorage.setItem("token", resData.accessToken);
}
