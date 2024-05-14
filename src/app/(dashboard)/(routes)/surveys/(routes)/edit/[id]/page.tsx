import { Metadata } from "next";
import EditSurveyForm from "./_components/form";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Edit Survey",
	description: "Edit Survey",
};

export default function Page() {
	return (
		<>
			<Header>Survey</Header>
			<EditSurveyForm />
		</>
	);
}
