"use client";

import { getUserProfile } from "@/apis/user";
import { AdminRole } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const AdminProtectedRoute: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const router = useRouter();
	const [show, setShow] = React.useState(false);

	const { data, isPending } = useQuery({
		queryKey: ["user"],
		queryFn: getUserProfile,
	});

	React.useEffect(() => {
		if (typeof window !== "undefined" && !isPending) {
			const token_local = localStorage.getItem("token");

			if (
				!token_local ||
				!data?.data ||
				![AdminRole.ADMIN, AdminRole.SUPER_ADMIN].includes(
					data?.data.role as AdminRole
				)
			) {
				return router.push("/login");
			}

			return setShow(true);
		} else {
			setShow(false);
		}
	}, [router, data?.data, isPending]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (!show) {
		return null;
	}

	return <>{children}</>;
};

export default AdminProtectedRoute;
