import urls from "@/lib/urls";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminProtectedRoute: React.FC<React.PropsWithChildren> = async ({
	children,
}) => {
	const session = await getServerSession();

	if (!session || !session.user) {
		return redirect(urls.auth.login());
	}

	return <>{children}</>;
};

export default AdminProtectedRoute;
