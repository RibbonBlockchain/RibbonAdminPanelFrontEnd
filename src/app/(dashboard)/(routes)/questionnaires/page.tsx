import urls from "@/lib/urls";
import { ButtonLink } from "@/components/ui/button_link";

import { FiEdit } from "react-icons/fi";
import UploadQuestionnaireModal from "./_components/upload_questionnaire_modal";
import Header from "@/components/header";

export default function Questionnaires() {
	return (
		<>
			<Header>Questionnaires</Header>
			<h2 className="mt-12 text-center text-2xl">
				Upload some questions to your survey
			</h2>
			<p className="text-center text-lg text-black-neutral">
				Click the button below to upload
			</p>

			<div className="mx-auto mt-8 space-x-4">
				<UploadQuestionnaireModal />
				<ButtonLink href={urls.dashboard.questionnaires.create}>
					Upload Manually <FiEdit className="ml-2 text-xl" />
				</ButtonLink>
			</div>
		</>
	);
}
