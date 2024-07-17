"use client";

import * as z from "zod";
import { ResponseType } from "@/types/enums";

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

export const InviteUserSchema = z.object({
	name: z
		.string()
		.min(1, "Name cannot be empty")
		.max(100, "Name too long")
		.trim(),
	email: z.string().email("Invalid email address").trim(),
});

export type InviteUserSchemaType = z.infer<typeof InviteUserSchema>;

export const CreateQuestionnaireSchema = z.object({
	reward: z
		.number({ coerce: true })
		.min(0.0000000001, "Reward must be greater than 0"),
	category: z.number({
		coerce: true,
		required_error: "Category is required",
		invalid_type_error: "Category is required",
	}),
	questions: z.array(
		z
			.object({
				question: z.string().min(1, "Question cannot be empty").trim(),
				response_type: z.nativeEnum(ResponseType),
				options: z.array(
					z.object({
						point: z.number({ coerce: true }),
						value: z.string().trim(),
					})
				),
			})
			.superRefine((values, context) => {
				if (
					[
						ResponseType.RADIO,
						ResponseType.CHECK_BOX,
						ResponseType.ROUND_BOX,
						ResponseType.BUBBLES,
					].includes(values.response_type)
				) {
					values.options.forEach((v, i) => {
						if (!v)
							context.addIssue({
								code: z.ZodIssueCode.custom,
								message: `Option ${i + 1} cannot be empty`,
								path: [`options.${i}`],
							});
					});
				}
			})
			.superRefine((values, context) => {
				if (
					[
						ResponseType.RADIO,
						ResponseType.CHECK_BOX,
						ResponseType.ROUND_BOX,
						ResponseType.BUBBLES,
					].includes(values.response_type)
				) {
					if (values.options.length < 1) {
						context.addIssue({
							code: z.ZodIssueCode.custom,
							message: "Options cannot be empty",
							path: ["options"],
						});
					}
				}
			})
	),
});

export type CreateQuestionnaireSchemaType = z.infer<
	typeof CreateQuestionnaireSchema
>;

export const EditQuestionnaireSchema = z.object({
	reward: z
		.number({ coerce: true })
		.min(0.0000000001, "Reward must be greater than 0"),
	category: z.number({
		coerce: true,
		required_error: "Category is required",
		invalid_type_error: "Category is required",
	}),
	questions: z.array(
		z
			.object({
				id: z.number({ coerce: true }).nullable(),
				question: z.string().min(1, "Question cannot be empty").trim(),
				response_type: z.nativeEnum(ResponseType),
				options: z.array(
					z.object({
						id: z.number({ coerce: true }).nullable(), // TODO: this is causing edit issues because it's not a json but a relation
						point: z.number({ coerce: true }),
						value: z.string().trim(),
					})
				),
			})
			.superRefine((values, context) => {
				if (
					[
						ResponseType.RADIO,
						ResponseType.CHECK_BOX,
						ResponseType.ROUND_BOX,
						ResponseType.BUBBLES,
					].includes(values.response_type)
				) {
					values.options.forEach((v, i) => {
						if (!v)
							context.addIssue({
								code: z.ZodIssueCode.custom,
								message: `Option ${i + 1} cannot be empty`,
								path: [`options.${i}`],
							});
					});
				}
			})
			.superRefine((values, context) => {
				if (
					[
						ResponseType.RADIO,
						ResponseType.CHECK_BOX,
						ResponseType.ROUND_BOX,
						ResponseType.BUBBLES,
					].includes(values.response_type)
				) {
					if (values.options.length < 1) {
						context.addIssue({
							code: z.ZodIssueCode.custom,
							message: "Options cannot be empty",
							path: ["options"],
						});
					}
				}
			})
	),
});

export type EditQuestionnaireSchemaType = z.infer<
	typeof EditQuestionnaireSchema
>;

export const UploadQuestionnaireSchema = z.object({
	file:
		typeof window === "undefined"
			? z.any()
			: z

					.instanceof(File, { message: "Please select a file" })
					.refine((file) => file.size < 1024 * 1024 * 5, {
						message: "File size must be less than 5MB",
					})
					.refine(
						(file) =>
							file.type ===
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						{
							message: "Only Excel files are allowed",
						}
					)
					.nullable(),
});

export type UploadQuestionnaireSchemaType = z.infer<
	typeof UploadQuestionnaireSchema
>;

export const CreateSurveySchema = z.object({
	reward: z
		.number({ coerce: true })
		.min(0.0000000001, "Reward must be greater than 0"),
	category: z.number({
		coerce: true,
		required_error: "Category is required",
		invalid_type_error: "Category is required",
	}),
	questions: z.array(
		z
			.object({
				question: z.string().min(1, "Survey cannot be empty").trim(),
				response_type: z.nativeEnum(ResponseType),
				options: z.array(
					z.object({
						point: z.number({ coerce: true }),
						value: z.string().trim(),
					})
				),
			})
			.superRefine((values, context) => {
				if (
					[
						ResponseType.RADIO,
						ResponseType.CHECK_BOX,
						ResponseType.ROUND_BOX,
						ResponseType.BUBBLES,
					].includes(values.response_type)
				) {
					values.options.forEach((v, i) => {
						if (!v)
							context.addIssue({
								code: z.ZodIssueCode.custom,
								message: `Option ${i + 1} cannot be empty`,
								path: [`options.${i}`],
							});
					});
				}
			})
	),
});

export type CreateSurveySchemaType = z.infer<typeof CreateSurveySchema>;

export const CreateTaskSchema = z.object({
	reward: z
		.number({ coerce: true })
		.min(0.0000000001, "Reward must be greater than 0"),
	category: z.number({
		coerce: true,
		required_error: "Category is required",
		invalid_type_error: "Category is required",
	}),
	questions: z.array(
		z
			.object({
				question: z.string().min(1, "Task cannot be empty").trim(),
				response_type: z.nativeEnum(ResponseType),
				options: z.array(
					z.object({
						point: z.number({ coerce: true }),
						value: z.string().trim(),
					})
				),
			})
			.superRefine((values, context) => {
				if (
					[
						ResponseType.RADIO,
						ResponseType.CHECK_BOX,
						ResponseType.ROUND_BOX,
						ResponseType.BUBBLES,
					].includes(values.response_type)
				) {
					values.options.forEach((v, i) => {
						if (!v)
							context.addIssue({
								code: z.ZodIssueCode.custom,
								message: `Option ${i + 1} cannot be empty`,
								path: [`options.${i}`],
							});
					});
				}
			})
	),
});

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>;

export const CreateCategorySchema = z.object({
	name: z
		.string()
		.min(1, "Category name cannot be empty")
		.max(100, "Category name too long")
		.trim(),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

export const EditSesScoreSchema = z.object({
	questions: z.array(
		z.object({
			id: z.number({ coerce: true }).nullable(),
			question: z.string().min(1, "Question cannot be empty").trim(),
			response_type: z.nativeEnum(ResponseType),
			options: z.array(
				z.object({
					id: z.number({ coerce: true }).nullable(), // TODO: this is causing edit issues because it's not a json but a relation
					point: z.number({ coerce: true }),
					value: z.string().trim(),
				})
			),
		})
	),
});

export type EditSesScoreSchemaType = z.infer<typeof EditSesScoreSchema>;

export const CreateVaultSchema = z.object({
	type: z.object(
		{
			id: z.number({ coerce: true }),
			address: z.string().min(1, "Address cannot be empty").trim(),
			image: z.any(),
			name: z.string().min(1, "Name cannot be empty").trim(),
			point_per_coin: z.number({ coerce: true }),
			ticker: z.string().min(1, "Ticker cannot be empty").trim(),
		},
		{
			required_error: "Input type is required",
			invalid_type_error: "Input type is required",
		}
	),
	input: z
		.number({ coerce: true })
		.min(0.0000000001, "Input must be greater than 0"),
	output: z
		.number({ coerce: true })
		.min(0.0000000001, "Output must be greater than 0"),
});

export type CreateVaultSchemaType = z.infer<typeof CreateVaultSchema>;

export const SendNotificationSchema = z.object({
	title: z
		.string()
		.min(1, "Title cannot be empty")
		.max(100, "Title too long")
		.trim(),
	message: z
		.string()
		.min(12, "Message cannot be less than 12 characters")
		.max(1000, "Message cannot be more than 1000 characters")
		.trim(),
});

export type SendNotificationSchemaType = z.infer<typeof SendNotificationSchema>;
