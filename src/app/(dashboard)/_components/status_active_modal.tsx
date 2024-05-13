import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { ImSpinner3 } from "react-icons/im";

type Props = {
	isOpen: boolean;
	closeModal: () => void;
	handleAction: () => void;
	type: "questionnaire" | "survey" | "task";
	isPending: boolean;
};

const StatusActiveModal: React.FC<Props> = (props) => {
	return (
		<AlertDialog open={props.isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will enable the {props.type} and render it active.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button disabled={props.isPending} onClick={props.closeModal}>
							Cancel
						</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							disabled={props.isPending}
							onClick={props.handleAction}
							className="w-full max-w-[120px]"
						>
							{props.isPending ? (
								<ImSpinner3 className="animate-spin" />
							) : (
								"Continue"
							)}
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default StatusActiveModal;
