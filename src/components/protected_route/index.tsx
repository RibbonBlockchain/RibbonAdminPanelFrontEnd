"use client";

import urls from "@/lib/urls";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useToken } from "../providers/token";

const AdminProtectedRoute: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const { data: session } = useSession({ required: true });

	const { setToken } = useToken();

	useEffect(() => {
		if (!session?.user.apiToken) return;
		setToken(session.user.apiToken);
	}, [session?.user.apiToken, setToken]);

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
