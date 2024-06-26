"use client";

import React from "react";
import Link from "next/link";
import { nav_links } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import urls from "@/lib/urls";
import Image from "next/image";
import RibbonLogo from "@/public/images/ribbon.webp";
import LogoutModal from "./logout_modal";

export const sidebar_actions = [
	{
		name: "Logout",
		component: LogoutModal,
	},
];

const DashboardSidebar = () => {
	const pathname = usePathname();

	return (
		<>
			<Link
				href={urls.dashboard.home}
				className="inline-flex px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
			>
				<Image priority src={RibbonLogo} alt="" className={cn("w-28")} />
			</Link>

			<div className="mt-12 flex h-full flex-col justify-between">
				<ul className="sidebar-scrollbar max-h-[calc(100vh-10rem)] w-full space-y-8 overflow-y-auto text-white">
					{nav_links.map((x) => (
						<li key={`sidebar-nav-link-${x.name}`} className="px-4">
							<Link
								href={x.href}
								className={cn(
									"flex w-full items-center gap-2 rounded-lg px-3 py-3",
									"text-white transition-all duration-300 hover:bg-primary-900",
									{
										"bg-primary text-white":
											x.href !== "/"
												? pathname.startsWith(x.href)
												: pathname === x.href,
									},
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
								)}
							>
								<x.image
								// className={cn("text-2xl text-[#E8E8E8]", x.imageClass)}
								/>
								<span className="font-small">{x.name}</span>
							</Link>
						</li>
					))}
				</ul>

				<ul className="mb-6 w-full space-y-8 px-4 text-white">
					{sidebar_actions.map((x) => (
						<li key={`sidebar-action-${x.name}`}>
							<x.component />
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default DashboardSidebar;
