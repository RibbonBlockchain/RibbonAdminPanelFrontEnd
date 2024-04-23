import NextAuth from "next-auth/next";
import { Admin } from ".";

export declare module "next-auth" {
	interface Session {
		user: Admin & { apiToken: string };
	}
}
