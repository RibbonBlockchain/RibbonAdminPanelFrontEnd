import { cn } from "@/lib/utils";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main
			className={cn(
				"relative flex min-h-screen flex-col justify-center bg-blue-900",
				"before:absolute before:-inset-0 before:block before:max-h-[35%] before:bg-gradient-to-r before:from-[#11cdef] before:to-[#1171ef]"
			)}
		>
			{/* <div className="lg:py-42 relative z-0 h-full w-full border py-36"> */}
			<div className={cn("absolute top-[28.8%] z-10 w-full")}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					version="1.1"
					viewBox="0 0 2560 100"
					x="0"
					y="0"
				>
					<polygon points="2560 0 2560 100 0 100" fill={"#1e3a8a"} />
				</svg>
			</div>
			<div
				className={cn(
					"z-10 flex w-full justify-center px-4"
					// "place-self-center self-center justify-self-center"
				)}
			>
				{children}
			</div>
			{/* </div> */}
		</main>
	);
};

export default AuthLayout;
