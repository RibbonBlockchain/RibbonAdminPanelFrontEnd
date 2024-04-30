"use client";

import React from "react";
import { IoNotifications } from "react-icons/io5";
import { Button } from "../ui/button";
import ProfileDropdown from "./profile_dropdown";
import { cn } from "@/lib/utils";
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
				<Button
					aria-describedby="notifications"
					className="rounded-md bg-primary px-2 py-2 text-2xl text-white"
				>
					<IoNotifications />
				</Button>

				<ProfileDropdown />
			</div>
		</header>
	);
};

export default Header;
