"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Dropzone from "react-dropzone";
import { HiOutlineFolderPlus } from "react-icons/hi2";
import Image from "next/image";
import UploadFileSvg from "@/public/svgs/upload_file.svg";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import urls from "@/lib/urls";
import { getAxiosErrorMessage } from "@/lib/utils";
import {
	UploadQuestionnaireSchema,
	UploadQuestionnaireSchemaType,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { questionnaireCategoryService } from "@/services/questionnaire_category";
import { ImSpinner3 } from "react-icons/im";
import ErrorMessage from "@/components/ui/error_message";

const UploadQuestionnaireModal = () => {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { data: session } = useSession();

	const { mutate, isPending } = useMutation({
		mutationKey: ["Upload Questionnaire"],
		mutationFn: async (data: File) =>
			questionnaireCategoryService.uploadQuestionnaire(
				data,
				session?.user.apiToken || ""
			),
		onSuccess({ data }) {
			toast({
				title: "Success",
				description: data.message,
				duration: 5000,
			});
			reset();
			setOpen(false);
			router.push(urls.dashboard.questionnaires.index);
		},
		onError(error) {
			toast({
				title: "Error",
				description: getAxiosErrorMessage(error),
				duration: 5000,
				variant: "destructive",
			});
		},
	});

	const {
		handleSubmit,
		setValue,
		trigger,
		reset,
		watch,
		setError,
		formState: { errors },
	} = useForm<UploadQuestionnaireSchemaType>({
		mode: "onSubmit",
		resolver: zodResolver(UploadQuestionnaireSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		if (!data.file) {
			setError("file", { type: "required", message: "Please select a file" });
			return;
		}
		mutate(data.file);
	});

	const { file } = watch();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"}>
					Upload a Spreadsheet <HiOutlineFolderPlus className="ml-2 text-xl" />
				</Button>
			</DialogTrigger>

			<DialogContent className="p-8">
				<DialogHeader className="space-y-4">
					<DialogTitle>Upload a Spreadsheet</DialogTitle>
					<hr />
				</DialogHeader>

				<ErrorMessage>{errors.file?.message}</ErrorMessage>

				<Dropzone
					multiple={false}
					maxFiles={1}
					maxSize={5000000} // 5mb
					accept={{
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
							[".xlsx", ".xlsm", ".xltx", ".xltm"],
					}}
					onDrop={(acceptedFiles) => {
						setValue("file", acceptedFiles[0]);
						trigger("file");
					}}
				>
					{({ getRootProps, getInputProps }) => (
						<section className="rounded-sm border border-dashed border-neutral-300 p-12">
							<div {...getRootProps()} className="flex flex-col items-center">
								<input {...getInputProps()} />
								<Image src={UploadFileSvg} alt="" />
								<span className="text-2xl font-light text-[#707070]">
									Drag & drop a file
								</span>
								<div className="text-[#707070]">
									or <span className="text-primary">select a file </span>
								</div>
							</div>
						</section>
					)}
				</Dropzone>
				{file && (
					<div className="flex items-center justify-between rounded-md border px-2 py-2 text-base">
						<span className="truncate">{file.name}</span>
						<Button
							variant={"plain"}
							onClick={() => {
								setValue("file", null);
								trigger("file");
							}}
							className="size-8 border border-red-500 p-0 text-red-500 hover:bg-red-500 hover:text-white"
						>
							&times;
						</Button>
					</div>
				)}
				<DialogFooter>
					<Button disabled={isPending} onClick={onSubmit}>
						{isPending ? (
							<span className="flex items-center">
								<ImSpinner3 className="mr-2 animate-spin" /> Uploading
							</span>
						) : (
							"Upload"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UploadQuestionnaireModal;
