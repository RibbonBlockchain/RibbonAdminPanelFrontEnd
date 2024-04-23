import { cn } from "@/lib/utils";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main
			className={cn(
				"relative flex min-h-screen flex-col justify-center bg-[#4b3499]",
				"before:absolute before:-inset-0 before:block before:max-h-[35%] before:bg-gradient-to-r before:from-[#aa96ec] before:to-[#714EE7]"
			)}
		>
			<div className={cn("z-10 flex w-full justify-center px-4")}>
				{children}
			</div>
		</main>
	);
};

export default AuthLayout;
