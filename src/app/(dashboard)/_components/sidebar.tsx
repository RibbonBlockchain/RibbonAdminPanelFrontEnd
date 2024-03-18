"use client";

import React from "react";
import Link from "next/link";
import { nav_links } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
	const pathname = usePathname();

	return (
		<ul className="mt-12 w-full space-y-4">
			{nav_links.map((x) => (
				<li key={`sidebar-nav-link-${x.name}`}>
					<Link
						href={x.href}
						className={cn(
							"flex w-full items-center gap-2 rounded-md px-2 py-2",
							"transition-all duration-300 hover:bg-primary hover:text-white",
							{ "bg-primary text-white": pathname === x.href },
							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
						)}
					>
						<x.image className={cn("text-2xl", x.imageClass)} />
						<span className="font-small">{x.name}</span>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default DashboardSidebar;
