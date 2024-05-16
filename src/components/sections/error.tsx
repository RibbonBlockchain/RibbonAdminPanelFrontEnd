import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
	error?: Error & { digest?: string };
	reset?: () => void;
	statusCode?: number;
	containerClass?: string;
};

const ErrorScreen: React.FC<Props> = (props) => {
	return (
		<main
			className={cn(
				"min-h-[min(100vh,40rem)] px-4",
				"flex h-full w-full flex-col items-center justify-center gap-4",
				props.containerClass
			)}
		>
			<span className="text-4xl">😔</span>
			<h1 className="text-center text-2xl lg:text-6xl">
				Sorry, An Error Occurred
			</h1>
			<p className="text-center">
				{props.error?.message ||
					"It looks like you’re trying to access a page that has been deleted or never existed."}
			</p>

			{props.reset && (
				<Button onClick={props.reset} className="px-6 py-3">
					Retry
				</Button>
			)}
		</main>
	);
};

export default ErrorScreen;
