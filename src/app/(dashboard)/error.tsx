"use client"; // Error components must be Client Components

import ErrorScreen from "@/components/sections/error";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.table(error);
	}, [error]);

	return <ErrorScreen error={error} reset={reset} />;
}
