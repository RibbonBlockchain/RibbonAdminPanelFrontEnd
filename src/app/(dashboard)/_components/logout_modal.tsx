"use client";

import LogoutSvg from "@/components/svgs/logout";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import urls from "@/lib/urls";
import { cn, logout } from "@/lib/utils";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutModal = () => {
	const router = useRouter();

	function handleLogout() {
		logout();
		router.replace(urls.auth.login());
	}

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant={"plain"}
						className={cn(
							"text-base",
							"flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3",
							"text-white transition-all duration-300 hover:bg-primary-900",
							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
						)}
					>
						<span>Log out</span>
						<LogoutSvg />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							Your account would be automatically logged out.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel asChild>
							<Button>No</Button>
						</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button onClick={handleLogout}>Yes</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default LogoutModal;
