"use client";

import React from "react";
import { IoNotifications } from "react-icons/io5";
import { Button } from "../ui/button";
import ProfileDropdown from "./profile_dropdown";
import { cn } from "@/lib/utils";
import InviteUserModal from "@/app/(dashboard)/_components/invite_user_modal";
// import { getServerSession } from "next-auth";

const Header: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<header
			className={cn(
				"flex h-20 w-full items-center justify-between bg-[#F8F6FF] px-4 py-4",
				"sticky top-0 z-10 w-full shadow-sm",
				"min-w-[764px]"
			)}
		>
			<h1 className="text-nowrap text-2xl font-bold">{children}</h1>

			<div className="flex w-full items-center justify-end gap-4">
				<InviteUserModal />
				<Button
					variant={"header_icon"}
					size={"icon"}
					aria-describedby="notifications"
				>
					<IoNotifications />
					<span className="sr-only">Notifications</span>
				</Button>

				<ProfileDropdown />
			</div>
		</header>
	);
};

export default Header;
