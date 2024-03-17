"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema, ForgotPasswordSchemaType } from "@/schemas";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { ImSpinner3 } from "react-icons/im";
import ErrorMessage from "@/components/ui/error_message";
import { useRouter, useSearchParams } from "next/navigation";
import urls from "@/lib/urls";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordForm() {
	const params = useSearchParams();
	const emailParam = params?.get("email") || "";

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ForgotPasswordSchemaType>({
		mode: "onSubmit",
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: emailParam,
		},
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			// const response = await fetch(
			// 	`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/login`,
			// 	{
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 		body: JSON.stringify(data),
			// 	}
			// );

			// if (!response.ok) {
			// 	throw new Error(
			// 		(await response.json()).message || "Something went wrong"
			// 	);
			// }

			reset();

			router.push(urls.auth.reset_password(`email=${data.email}`));
		} catch (error: any) {
			toast({
				title: "Error",
				description: error?.message,
				duration: 5000,
				variant: "destructive",
			});
		}
	});

	return (
		<form className="flex flex-col gap-4" onSubmit={onSubmit}>
			<div>
				<Label>Email</Label>
				<Input
					placeholder="Name@domain.com"
					type="email"
					{...register("email")}
				/>
				<ErrorMessage>{errors.email?.message}</ErrorMessage>
			</div>

			<Button type="submit" disabled={isSubmitting} variant={"blue"}>
				{isSubmitting ? <ImSpinner3 className="mr-1 animate-spin" /> : "Reset"}
			</Button>
			<br />
		</form>
	);
}
