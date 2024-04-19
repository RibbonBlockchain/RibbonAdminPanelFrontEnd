"use client";

import LogoutSvg from "@/components/svgs/logout";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import urls from "@/lib/urls";
import { cn, logout } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";

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
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={"plain"}
					className={cn(
						"text-base",
						"flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3",
						"hover:bg-primary-900 text-white transition-all duration-300",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
					)}
				>
					<span>Log out</span>
					<LogoutSvg />
				</Button>
			</DialogTrigger>

			<DialogContent className="py-8">
				<DialogHeader>
					{/* <Image src={} alt="" /> */}
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						Your account would be automatically logged out.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button>No</Button>
					</DialogClose>
					<Button variant={"dropdown"} onClick={handleLogout}>
						Yes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default LogoutModal;
