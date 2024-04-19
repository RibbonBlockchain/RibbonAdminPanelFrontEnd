"use client";

import React from "react";
import {
	QueryClient,
	QueryClientProvider,
	QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { logout } from "@/lib/utils";

const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	// const queryCache = new QueryCache({
	// 	onError: (error) => {
	// 		// @ts-ignore
	// 		if (error.cause && error.cause!.status === 404) {
	// 			logout();
	// 		}
	// 		console.log({ cause: error.cause });
	// 	},
	// });
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				// queryCache,
			})
	);
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default QueryProvider;
