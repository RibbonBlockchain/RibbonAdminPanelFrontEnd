import { authOptions } from "@/lib/next_auth";
import urls from "@/lib/urls";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminProtectedRoute: React.FC<React.PropsWithChildren> = async ({
	children,
}) => {
	const session = await getServerSession(authOptions);

	console.log({ session });

	if (
		!session ||
		!session.user ||
		!["ADMIN", "SUPER_ADMIN"].includes(session.user.role)
	) {
		return redirect(urls.auth.login());
	}

	return <>{children}</>;
};

export default AdminProtectedRoute;
