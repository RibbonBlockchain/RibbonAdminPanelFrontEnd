import urls from "@/lib/urls";
import { ButtonLink } from "@/components/ui/button_link";

import { FiEdit } from "react-icons/fi";
import UploadQuestionnaireModal from "./_components/upload_questionnaire_modal";
import Header from "@/components/header";
import SearchInput from "../../_components/search_input";
import QuestionnairesTabs from "./_components/questionnaires_tabs";

export default function Questionnaires() {
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

				<div className="flex w-full items-center justify-end gap-4">
					<ButtonLink
						href={urls.dashboard.questionnaires.index}
						variant={"plain"}
						className="rounded-full border border-primary/20 bg-primary/20 text-primary"
					>
						Active (0)
					</ButtonLink>
					<ButtonLink
						href={urls.dashboard.questionnaires.index}
						variant={"plain"}
						className="rounded-full border border-primary/20 text-primary"
					>
						Closed (0)
					</ButtonLink>

					<SearchInput
						placeholder="Search Questionnaires"
						container_className="w-full max-w-xs ml-3"
					/>
				</div>
			</div>

			<div className="mt-12 px-4">
				<QuestionnairesTabs />
			</div>
		</>
	);
}
