import { Metadata } from "next";
import EditSesTaskForm from "./_components/form";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Edit Task Ses Score",
	description: "Edit Task Ses Score",
};

export default function Page() {
	return (
		<>
			<Header>Task</Header>
			<EditSesTaskForm />
		</>
	);
}
