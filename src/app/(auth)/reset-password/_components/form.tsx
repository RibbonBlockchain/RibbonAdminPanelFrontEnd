"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/schemas";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { ImSpinner3 } from "react-icons/im";
import ErrorMessage from "@/components/ui/error_message";
import { PasswordInput } from "@/components/ui/password_input";
import { useRouter, useSearchParams } from "next/navigation";
import urls from "@/lib/urls";
import { Button } from "@/components/ui/button";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ResetPasswordForm() {
	const params = useSearchParams();
	const emailParam = params?.get("email") || "";

	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		trigger,
		setValue,
		reset,
	} = useForm<ResetPasswordSchemaType>({
		mode: "onBlur",
		resolver: zodResolver(ResetPasswordSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			// const response = await fetch(
			// 	`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/reset-password`,
			// 	{
			// 		method: methods.POST,
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 		body: JSON.stringify({ ...data, email: emailParam }),
			// 	}
			// );

			// if (!response.ok) {
			// 	throw new Error(
			// 		(await response.json()).message || "Something went wrong"
			// 	);
			// }

			reset();

			router.push(urls.auth.login(`email=${emailParam}`));
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
				<Label>OTP</Label>
				<InputOTP
					{...register("otp")}
					onChange={(v) => {
						setValue("otp", v);
						trigger("otp");
					}}
					maxLength={6}
					render={({ slots }) => (
						<>
							<InputOTPGroup className="w-full">
								{slots.map((slot, index) => (
									<InputOTPSlot key={index} {...slot} />
								))}{" "}
							</InputOTPGroup>
						</>
					)}
				/>
				<ErrorMessage>{errors.otp?.message}</ErrorMessage>
			</div>
			<div>
				<Label>New Password</Label>
				<PasswordInput
					placeholder="Enter new password"
					{...register("password")}
				/>
				<ErrorMessage>{errors.password?.message}</ErrorMessage>
			</div>
			<div>
				<Label>Confirm Password</Label>
				<PasswordInput
					placeholder="Confirm new password"
					{...register("confirmPassword")}
				/>
				<ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
			</div>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? (
					<ImSpinner3 className="mr-1 animate-spin" />
				) : (
					"Confirm"
				)}
			</Button>
			<br />
		</form>
	);
}
