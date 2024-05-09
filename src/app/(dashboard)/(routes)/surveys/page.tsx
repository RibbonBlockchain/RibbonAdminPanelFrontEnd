import { Suspense } from "react";
import type { Metadata } from "next";
import { FiEdit } from "react-icons/fi";

import UploadSurveyModal from "./_components/upload_survey_modal";
import SurveysList from "./_components/surveys_list";
import { ButtonLink } from "@/components/ui/button_link";
import Header from "@/components/header";
import Search from "@/components/search";
import StatusToggler from "@/components/status_toggler";

import urls from "@/lib/urls";

export const metadata: Metadata = {
	title: "Surveys",
	description: "Surveys",
};

export default async function Page({
	searchParams,
}: {
	searchParams: { q?: string; page?: string; pageSize?: string };
}) {
	return (
		<>
			<Header>Surveys</Header>
			<h2 className="mt-12 text-center text-2xl font-semibold">
				Upload Surveys
			</h2>
			<p className="text-center text-sm text-black-neutral">
				Click the button below to upload
			</p>
			<div className="mx-auto mt-8 space-x-4">
				<UploadSurveyModal />
				<ButtonLink href={urls.dashboard.surveys.create}>
					Upload Manually <FiEdit className="ml-2 text-xl" />
				</ButtonLink>
			</div>
			<div className="mt-12 flex items-center justify-between gap-12 px-4">
				<h2 className="text-2xl font-semibold lg:text-nowrap">
					Recently added surveys
				</h2>

				<div className="flex w-full items-center justify-end gap-4">
					<StatusToggler count={0} title={"Active"} action_status={"ACTIVE"} />
					<StatusToggler count={0} title={"Closed"} action_status={"CLOSED"} />
				</div>

				<Search />
			</div>

			<Suspense fallback={<div className="mx-4">Loading...</div>}>
				<SurveysList searchParams={searchParams} />
			</Suspense>
		</>
	);
}
