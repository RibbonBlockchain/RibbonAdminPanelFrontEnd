import React from "react";
import Header from "@/components/header";
import UsersReportPage from "./_components/_page";

const page = ({
	searchParams,
}: {
	searchParams: { q?: string; page?: string; pageSize?: string };
}) => {
	return (
		<>
			<Header />
			<div className="my-12 flex flex-col items-center">
				<h2 className="text-center text-2xl font-semibold">
					Users Activities Report
				</h2>
				<p className="mt-1 text-center text-sm">
					Analyzing user responses and app engagement metrics
				</p>
			</div>

			<UsersReportPage searchParams={searchParams} />
		</>
	);
};

export default page;
