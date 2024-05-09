import { Metadata } from "next";
import CreateTaskForm from "./_components/form";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Create Questionnaire",
	description: "Create Questionnaire",
};

export default function CreateQuestionnaires() {
	return (
		<>
			<Header>Tasks</Header>
			<CreateTaskForm />;
		</>
	);
}
