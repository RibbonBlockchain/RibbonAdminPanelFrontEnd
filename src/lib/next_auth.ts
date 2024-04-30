import { authService } from "@/services/auth";
import urls from "@/lib/urls";
import { Admin, AdminCustom } from "@/types";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	pages: {
		signIn: urls.auth.login(),
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, _req) {
				try {
					if (typeof credentials !== "undefined") {
						const loginResponse = await authService.login({
							email: credentials.email,
							password: credentials.password,
						});

						if (!loginResponse.data) {
							return null;
						}

						const userResponse = await authService.getProfile(
							loginResponse.data.accessToken
						);

						if (typeof userResponse !== "undefined") {
							return {
								...(userResponse.data as AdminCustom),
								apiToken: loginResponse.data.accessToken,
							};
						} else {
							return null;
						}
					} else {
						return null;
					}
				} catch (error: any) {
					console.error({ error });
					throw new Error(error.response?.data?.message || error?.message);
					// return null;
				}
			},
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async session({ session, token }) {
			// console.log({ token, session });
			session.user = token as any;
			return session;
		},
		async jwt({ token, user }) {
			// console.log({ token, user });
			return {
				...token,
				...user,
			};
		},
	},
};
