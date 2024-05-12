import { Metadata } from "next";
import EditQuestionnaireForm from "./_components/form";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Edit Questionnaire",
	description: "Edit Questionnaire",
};

export default function Page() {
	return (
		<>
			<Header>Questionnaire</Header>
			<EditQuestionnaireForm />
		</>
	);
}
