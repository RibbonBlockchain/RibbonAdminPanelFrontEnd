import Header from "@/components/header";
import React from "react";
import SingleUserReportPage from "./_components/_page";

const page = ({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { view?: string };
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

			<SingleUserReportPage
				view={
					["questionnaires", "surveys", "tasks"].includes(
						searchParams.view || ""
					)
						? (searchParams.view as string)
						: "questionnaires"
				}
			/>
		</>
	);
};

export default page;
