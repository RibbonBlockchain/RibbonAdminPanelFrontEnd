"use client";

import { Login } from "@/apis/auth";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error_message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password_input";
import { toast } from "@/components/ui/use-toast";
import urls from "@/lib/urls";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { LoginResponse } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImSpinner3 } from "react-icons/im";

export default function LoginForm() {
	const router = useRouter();
	const params = useSearchParams();
	const emailParam = params?.get("email") || "";
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ["Login"],
		mutationFn: Login,
		onSuccess: () => {
			// Invalidate and refetch
			reset();
			queryClient.invalidateQueries();
			router.push(urls.dashboard.home);
		},
		onError(error) {
			toast({
				title: "Error",
				description: error.message,
				duration: 5000,
				variant: "destructive",
			});
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<LoginSchemaType>({
		mode: "onSubmit",
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: emailParam || "superadmin@ribbon.com",
			password: "Password123?",
		},
	});

	const onSubmit = handleSubmit(async (data) => {
		mutate(data);
	});

	const watchedFields = watch();

	return (
		<form className="flex flex-col gap-4" onSubmit={onSubmit}>
			<Link
				href={urls.auth.forgot_password(`email=${watchedFields.email || ""}`)}
				className="-my-1 self-end text-sm text-blue-500 hover:text-blue-700"
			>
				Forgot password?
			</Link>

			<div>
				<Label>Email</Label>
				<Input placeholder="Email" {...register("email")} />
				<ErrorMessage>{errors.email?.message}</ErrorMessage>
			</div>

			<div>
				<Label>Password</Label>
				<PasswordInput
					placeholder="Password"
					type="password"
					{...register("password")}
				/>
				<ErrorMessage>{errors.password?.message}</ErrorMessage>
			</div>

			<Button type="submit" disabled={isPending} variant={"blue"}>
				{isPending ? <ImSpinner3 className="mr-1 animate-spin" /> : "Login"}
			</Button>
			<br />
		</form>
	);
}
