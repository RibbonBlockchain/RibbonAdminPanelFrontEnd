import { Metadata } from "next";
import CreateQuestionnaireForm from "./_components/form";

export const metadata: Metadata = {
	title: "Create Questionnaire",
	description: "Create Questionnaire",
};

export default function CreateQuestionnaires() {
	return <CreateQuestionnaireForm />;
}
