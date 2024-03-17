"use client";

import { useRouter } from "next/navigation";
import React from "react";

const AdminProtectedRoute: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const router = useRouter();
	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const token_local = localStorage.getItem("token");

			if (!token_local) {
				return router.push("/login");
			}

			return setShow(true);
		}

		setShow(false);
	}, [router]);

	if (!show) {
		return null;
	}

	return <>{children}</>;
};

export default AdminProtectedRoute;
