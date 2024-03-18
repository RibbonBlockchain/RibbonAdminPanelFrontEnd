"use client";

import React from "react";
import { cn } from "@/lib/utils";
import RibbonLogo from "@/public/images/ribbon.webp";
import Image from "next/image";
import { IoNotifications } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import urls from "@/lib/urls";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/apis/user";
import ProfileDropdown from "./profile_dropdown";

const Header = () => {
	const { data } = useQuery({
		queryKey: ["user"],
		queryFn: getUserProfile,
	});

	return (
		<header
			className={cn(
				"flex h-20 w-full justify-between bg-white px-4 py-4 shadow-sm",
				"sticky top-0 z-10",
				"min-w-[764px]"
			)}
		>
			<div className="flex w-full items-center justify-between">
				<Link
					href={urls.dashboard.home}
					className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
				>
					<Image priority src={RibbonLogo} alt="" className={cn("w-28")} />
				</Link>

				<span className="text-2xl font-bold">
					Hello, {data?.data.role === "SUPER_ADMIN" ? "Super" : "Admin"} 👋🏼
				</span>
			</div>

			<div className="flex w-full items-center justify-end gap-4">
				<Button
					aria-describedby="notifications"
					className="rounded-md bg-primary px-2 py-2 text-2xl text-white"
				>
					<IoNotifications />
				</Button>

				<ProfileDropdown data={data} />
			</div>
		</header>
	);
};

export default Header;
