import { Metadata } from "next";
import CreateSurveyForm from "./_components/form";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Create Survey",
	description: "Create Survey",
};

export default function Page() {
	return (
		<>
			<Header>Surveys</Header>
			<CreateSurveyForm />;
		</>
	);
}
