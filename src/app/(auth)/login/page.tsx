import React from "react";
import LoginForm from "./_components/form";
import AuthCard from "../_components/card";
import { getServerSession } from "next-auth";
import urls from "@/lib/urls";
import { redirect } from "next/navigation";

const page = async () => {
	// const session = await getServerSession();

	// if (!session || !session?.user) {
	return (
		<AuthCard bgColor="bg-white">
			<LoginForm />
		</AuthCard>
	);
	// }

	// return redirect(urls.dashboard.home);
};

export default page;
