import { Metadata } from "next";
import EditTaskForm from "./_components/form";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Edit Task",
	description: "Edit Task",
};

export default function Page() {
	return (
		<>
			<Header>Task</Header>
			<EditTaskForm />
		</>
	);
}
