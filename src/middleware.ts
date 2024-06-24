import { withAuth } from "next-auth/middleware";
import urls from "./lib/urls";

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {}, {
	callbacks: {
		authorized: ({ req, token }) => {

			if (
				req.nextUrl.pathname.startsWith(urls.auth.login()) ||
				req.nextUrl.pathname.startsWith(urls.auth.forgot_password()) ||
				req.nextUrl.pathname.startsWith(urls.auth.reset_password())
			) {
				return true;
			} else if (req.nextUrl.pathname.startsWith("/") && token === null) {
				return false;
			}

			return true;
		},
	},
});
