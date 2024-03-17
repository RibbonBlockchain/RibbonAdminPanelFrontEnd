import Header from "@/components/header";
import { cn } from "@/lib/utils";
import React from "react";
import DashboardSidebar from "./_components/sidebar";
// import AdminProtectedRoute from "@/components/protected_route";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const AdminProtectedRoute = React.lazy(
		() => import("@/components/protected_route")
	);

	return (
		<AdminProtectedRoute>
			<Header />

			<section className={cn("relative", "z-0 flex", "min-w-[1024px] border")}>
				<aside
					className={cn(
						"sticky top-0 flex border-r px-4",
						"h-[calc(100vh-80px)] min-w-[256px]"
					)}
				>
					<DashboardSidebar />
				</aside>
				<main
					className={cn(
						"w-full bg-gray-50 px-4",
						"flex h-[calc(100vh-80px)] flex-col",
						"overflow-y-auto"
					)}
				>
					{children}
				</main>
			</section>
		</AdminProtectedRoute>
	);
};

export default AuthLayout;
