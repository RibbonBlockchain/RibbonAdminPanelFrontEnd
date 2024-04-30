import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/providers/query";

import { getServerSession } from "next-auth";
import NextAuthProvider from "@/components/providers/next_auth";
import { authOptions } from "@/lib/next_auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Ribbon Protocol",
	description: "Ribbon Protocol",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body className={cn(inter.className, "relative")}>
				<QueryProvider>
					<NextAuthProvider session={session}>{children}</NextAuthProvider>
				</QueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
