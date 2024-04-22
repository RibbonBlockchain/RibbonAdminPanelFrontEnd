"use client";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error_message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { SendNotificationSchema, SendNotificationSchemaType } from "@/schemas";
import { sendNotificationService } from "@/services/send_notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { ImSpinner3 } from "react-icons/im";

const SendNotificationForm = () => {
	const { mutate, isPending } = useMutation({
		mutationKey: ["Send Notification"],
		mutationFn: (data: SendNotificationSchemaType) =>
			sendNotificationService.sendMessage(data),

		onSuccess: ({ data }) => {
			toast({
				title: "Success",
				description: data.message,
				duration: 5000,
			});
			reset();
		},
		onError(error) {
			console.log(error);
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
	} = useForm<SendNotificationSchemaType>({
		mode: "onSubmit",
		resolver: zodResolver(SendNotificationSchema),
	});

	const onSubmit = handleSubmit((data) => {
		mutate(data);
	});

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-6">
			<div>
				<Label htmlFor="title">Title</Label>
				<Input
					id="title"
					type="text"
					{...register("title")}
					placeholder="Title of your message"
				/>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
			</div>
			<div>
				<Label htmlFor="message">Message</Label>
				<Textarea
					id="message"
					{...register("message")}
					className="min-h-40"
					placeholder="Type your message here"
				/>
				<ErrorMessage>{errors.message?.message}</ErrorMessage>
			</div>

			<Button className="mt-4 w-full max-w-40 self-end" disabled={isPending}>
				{isPending ? <ImSpinner3 className="mr-1 animate-spin" /> : "Login"}
			</Button>
		</form>
	);
};

export default SendNotificationForm;
