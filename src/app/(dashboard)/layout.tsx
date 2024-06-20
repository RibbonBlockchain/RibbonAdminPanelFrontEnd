import { cn } from "@/lib/utils";
import React from "react";
import DashboardSidebar from "./_components/sidebar";
import AdminProtectedRoute from "@/components/protected_route";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<AdminProtectedRoute>
			<section
				className={cn(
					"relative",
					"z-0 flex overflow-hidden",
					"min-h-screen min-w-[1024px]"
				)}
			>
				<aside
					className={cn(
						"sticky top-0 flex flex-col border-r bg-black-primary pt-4",
						"h-screen min-w-[256px]"
					)}
				>
					<DashboardSidebar />
				</aside>
				<main
					id="main-content"
					className={cn(
						"w-full bg-primary/10",
						"flex h-screen flex-col",
						"overflow-y-auto"
					)}
				>
					{children}
				</main>
			</section>
		</AdminProtectedRoute>
	);
};

export default DashboardLayout;
