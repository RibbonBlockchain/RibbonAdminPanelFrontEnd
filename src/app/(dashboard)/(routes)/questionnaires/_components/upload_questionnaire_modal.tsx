"use client";

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Dropzone, { DropzoneProps, FileRejection } from "react-dropzone";
import { HiOutlineFolderPlus } from "react-icons/hi2";
import Image from "next/image";
import UploadFileSvg from "@/public/svgs/upload_file.svg";

const UploadQuestionnaireModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"}>
					Upload a Question <HiOutlineFolderPlus className="ml-2 text-xl" />
				</Button>
			</DialogTrigger>

			<DialogContent className="p-8">
				<DialogHeader className="space-y-4">
					<DialogTitle>Upload a file</DialogTitle>
					<hr />
				</DialogHeader>
				<Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
				<DialogFooter>
					<Button>Upload</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UploadQuestionnaireModal;
