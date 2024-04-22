import { authService } from "@/services/auth";
import urls from "@/lib/urls";
import { Admin, AdminCustom } from "@/types";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

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

						// TODO: remove
						console.log({ loginResponse });

						const userResponse = await authService.getProfile(
							loginResponse.data.accessToken
						);

						console.log({ userResponse });

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
				} catch (error) {
					console.error(error);
					return null;
				}
			},
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async session({ session, token }) {
			const sanitizedToken = Object.keys(token).reduce((p, c) => {
				// strip unnecessary properties
				if (c !== "iat" && c !== "exp" && c !== "jti" && c !== "apiToken") {
					const t = { ...p, [c]: token[c] };
					console.log({ t });
					return t;
				} else {
					console.log({ p });
					return p;
				}
			}, {});
			return { ...session, user: sanitizedToken, apiToken: token.apiToken };
		},
		async jwt({ token, user }) {
			console.log({ token });
			if (typeof user !== "undefined") {
				// user has just signed in so the user object is populated
				console.log({ user });
				return user as unknown as Admin;
			}
			return token;
		},
	},
};
