"use client";

import { getUserProfile } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const AdminProtectedRoute: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const router = useRouter();
	const [show, setShow] = React.useState(false);

	const { data } = useQuery({
		queryKey: ["user"],
		queryFn: getUserProfile,
	});

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const token_local = localStorage.getItem("token");

			if (
				!token_local ||
				data?.data ||
				["ADMIN", "SUPER_ADMIN"].includes(data?.data.role as string)
			) {
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
