import React from "react";
import LoginForm from "./_components/form";
import AuthCard from "../_components/card";

const page = () => {
	return (
		<AuthCard bgColor="bg-white">
			<LoginForm />
		</AuthCard>
	);
};

export default page;
