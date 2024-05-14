import { Metadata } from "next";
import EditSesSurveyForm from "./_components/form";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Edit Survey Ses Score",
	description: "Edit Survey Ses Score",
};

export default function Page() {
	return (
		<>
			<Header>Survey</Header>
			<EditSesSurveyForm />
		</>
	);
}
