import React, { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { CreateCategorySchemaType, CreateCategorySchema } from "@/schemas";
import { ImSpinner3 } from "react-icons/im";

type Props = {
	mutate: (data: CreateCategorySchemaType) => void;
	isPending: boolean;
	isSuccess: boolean;
};
const CreateCategoryForm: React.FC<Props> = (props) => {
	const { register, handleSubmit, reset } = useForm<CreateCategorySchemaType>({
		mode: "onSubmit",
		resolver: zodResolver(CreateCategorySchema),
	});

	const onSubmit = handleSubmit((data) => {
		props.mutate(data);
	});

	useEffect(() => {
		reset();
	}, [props.isSuccess]);

	return (
		<form
			onSubmit={onSubmit}
			className={cn("flex w-full max-w-sm gap-x-2 px-4 py-4")}
		>
			<Input
				type="text"
				placeholder="Create new category"
				{...register("name")}
			/>
			<Button disabled={props.isPending} aria-describedby="create new category">
				{props.isPending ? (
					<ImSpinner3 className="mr-1 animate-spin" />
				) : (
					<GoPlus className="stroke-2 text-xl" />
				)}
				<span className="sr-only">Create new category</span>
			</Button>
		</form>
	);
};

export default CreateCategoryForm;
