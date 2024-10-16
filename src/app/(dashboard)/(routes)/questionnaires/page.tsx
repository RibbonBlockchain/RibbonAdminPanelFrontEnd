import type { Metadata } from "next";
import { FiEdit } from "react-icons/fi";

import UploadQuestionnaireModal from "./_components/upload_questionnaire_modal";
import QuestionnairesList from "./_components/questionnaires_list";
import Header from "@/components/header";
import Search from "@/components/search";

import { ButtonLink } from "@/components/ui/button_link";

import urls from "@/lib/urls";
import QuestionnaireStatusToggle from "./_components/questionnaire_status_toggle";

export const metadata: Metadata = {
	title: "Questionnaires",
	description: "Questionnaires",
};

export default function Page({
	searchParams,
}: {
	searchParams: { q?: string; page?: string; pageSize?: string };
}) {
	return (
		<>
			<Header>Questionnaires</Header>
			<h2 className="mt-12 text-center text-2xl font-semibold">
				Upload Questionnaires
			</h2>
			<p className="text-center text-sm text-black-neutral">
				Click the button below to upload
			</p>

			<div className="mx-auto mt-8 space-x-4">
				<UploadQuestionnaireModal />
				<ButtonLink href={urls.dashboard.questionnaires.create}>
					Upload Manually <FiEdit className="ml-2 text-xl" />
				</ButtonLink>
			</div>

			<div className="mt-12 flex items-center justify-between gap-12 px-4">
				<h2 className="text-2xl font-semibold lg:text-nowrap">
					Recently added questionnaires
				</h2>

				<QuestionnaireStatusToggle />

				<Search />
			</div>

			<QuestionnairesList searchParams={searchParams} />
		</>
	);
}
