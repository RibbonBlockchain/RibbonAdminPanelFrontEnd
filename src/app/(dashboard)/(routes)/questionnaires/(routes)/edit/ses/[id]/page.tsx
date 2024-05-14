import { Metadata } from "next";
import EditSesQuestionnaireForm from "./_components/form";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Edit Questionnaire Ses Score",
	description: "Edit Questionnaire Ses Score",
};

export default function Page() {
	return (
		<>
			<Header>Questionnaire</Header>
			<EditSesQuestionnaireForm />
		</>
	);
}
