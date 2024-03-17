import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email("Invalid email address").trim(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.trim(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address").trim(),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z
	.object({
		otp: z.string().min(6, "Invalid OTP").trim(),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.trim(),
		confirmPassword: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.trim(),
	})
	.superRefine((values, context) => {
		if (values.password !== values.confirmPassword) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords do not match",
				path: ["confirmPassword"],
			});
		}
	});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
