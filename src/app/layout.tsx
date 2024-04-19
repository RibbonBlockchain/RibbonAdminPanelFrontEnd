import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/providers/query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Ribbon Blockchain",
	description: "Ribbon Blockchain",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(inter.className, "relative")}>
				<QueryProvider>{children}</QueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
