import { withAuth } from "next-auth/middleware";
import urls from "./lib/urls";

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {}, {
	callbacks: {
		authorized: ({ req, token }) => {
			if (
				![
					urls.auth.login(),
					urls.auth.forgot_password(),
					urls.auth.reset_password(),
				].includes(req.nextUrl.pathname) &&
				req.nextUrl.pathname.startsWith("/") &&
				token === null
			) {
				return false;
			}
			return true;
		},
	},
});
