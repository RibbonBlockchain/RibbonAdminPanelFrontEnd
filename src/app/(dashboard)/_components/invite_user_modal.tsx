"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiUserPlus, HiUsers } from "react-icons/hi2";

import { useToken } from "@/components/providers/token";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import ErrorMessage from "@/components/ui/error_message";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { InviteUserSchemaType, InviteUserSchema } from "@/schemas";
import { userService } from "@/services/user";
import { getErrorMessage } from "@/lib/utils";
import { ImSpinner3 } from "react-icons/im";

export default function InviteUserModal() {
	const { token } = useToken();

	const [open, setOpen] = React.useState(false);

	const { mutate, isPending } = useMutation({
		mutationKey: ["Invite User"],
		mutationFn: async (data: InviteUserSchemaType) =>
			await userService.inviteUser(data, token || ""),
		onSuccess(data) {
			toast({
				title: "Error",
				description: data?.message,
				duration: 5000,
				variant: "destructive",
			});
			reset();
			setOpen(false);
		},
		onError(error) {
			toast({
				title: "Error",
				description: getErrorMessage(error),
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
	} = useForm<InviteUserSchemaType>({
		mode: "onSubmit",
		resolver: zodResolver(InviteUserSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		mutate(data);
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="header_icon"
					size={"icon"}
					aria-describedby="invite users"
				>
					<HiUserPlus />
					<span className="sr-only">Invite users</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle className="flex items-center gap-1 text-2xl">
							<span>Invite users</span> <HiUsers className="text-primary" />
						</DialogTitle>
					</DialogHeader>
					<div className="my-6 flex flex-col gap-4">
						<div>
							<Input {...register("name")} placeholder="Name" />
							<ErrorMessage>{errors.name?.message}</ErrorMessage>
						</div>
						<div>
							<Input {...register("email")} placeholder="Email" />
							<ErrorMessage>{errors.email?.message}</ErrorMessage>
						</div>
					</div>
					<DialogFooter className="">
						<Button
							type="submit"
							disabled={isPending}
							className="w-full max-w-[8rem]"
						>
							{isPending ? (
								<ImSpinner3 className="mr-1 animate-spin" />
							) : (
								"Send invite"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
