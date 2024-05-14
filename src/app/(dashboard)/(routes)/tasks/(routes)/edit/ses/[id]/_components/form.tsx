"use client";

import React, { useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSesScoreSchema, EditSesScoreSchemaType } from "@/schemas";
import { useForm } from "react-hook-form";
import { response_types } from "@/lib/constants";
import { ResponseType } from "@/types/enums";
import { FaRegCircle } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateSesScoreRequest } from "@/types/request";
import { toast } from "@/components/ui/use-toast";
import { cn, getErrorMessage } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import urls from "@/lib/urls";
import { ImSpinner3 } from "react-icons/im";
import { taskService } from "@/services/tasks";
import { useToken } from "@/components/providers/token";
import { ButtonLink } from "@/components/ui/button_link";
import ErrorScreen from "@/components/sections/error";

const EditSesTaskForm = () => {
	const params = useParams();
	const qc = useQueryClient();
	const router = useRouter();
	const { token } = useToken();

	const { data, isPending, error, refetch } = useQuery({
		queryKey: ["task", { id: params?.id as string }],
		queryFn: () => taskService.getById(params?.id as string, token || ""),
		enabled: !!params?.id && !!token,
	});

	const { mutate, isPending: isPendingMutation } = useMutation({
		mutationKey: ["edit task ses score"],
		mutationFn: (data: UpdateSesScoreRequest) =>
			taskService.updateSesScore(data, token || ""),

		onSuccess(data) {
			toast({
				title: "Success",
				description: data.message,
				duration: 5000,
			});
			reset();
			qc.refetchQueries({
				queryKey: ["task", { id: params?.id as string }],
				type: "all",
			});
			router.push(urls.dashboard.tasks.index);
		},
		onError(error) {
			toast({
				title: "Error",
				description: getErrorMessage(error),
				duration: 5000,
				variant: "destructive",
			});
		},
	});

	const {
		// register,
		handleSubmit,
		// formState: { errors },
		setValue,
		reset,
		watch,
	} = useForm<EditSesScoreSchemaType>({
		mode: "onSubmit",
		resolver: zodResolver(EditSesScoreSchema),
		defaultValues: {},
	});

	const onSubmit = handleSubmit(async (data) => {
		const formattedData: {
			optionId: number;
			point: number;
		}[] = [];

		for (const question of data.questions) {
			for (const option of question.options) {
				formattedData.push({
					optionId: option.id as number,
					point: option.point,
				});
			}
		}

		// TODO: change to mutate
		mutate(formattedData);
	});

	const questions = watch("questions");

	useEffect(() => {
		if (data?.data && data?.data?.questions) {
			reset({
				questions: data.data.questions.map((question) => ({
					id: question.id,
					question: question.text,
					response_type: question.type,
					options: Array.isArray(question.options)
						? question.options.map((option, i) => ({
								id: option.id,
								value: option.text,
								point: option.point,
							}))
						: [],
				})),
			});
		}
	}, [reset, data?.data, data?.data?.questions]);

	if (isPending) return <p className="p-4">Loading...</p>;

	if (error) return <ErrorScreen error={error} reset={refetch} />;

	return (
		<form
			onSubmit={onSubmit}
			className="mx-auto my-16 w-full max-w-4xl space-y-10 px-6"
		>
			<Card className="pb-8 transition-all duration-500">
				<CardHeader>
					<CardTitle>
						Update SES Scores of {data?.data?.name || "Task"}{" "}
					</CardTitle>
					<CardDescription>
						Upload maximum of {+process.env.NEXT_PUBLIC_TASK_LIMIT} questions
					</CardDescription>
				</CardHeader>

				<CardContent className="mx-auto max-w-3xl space-y-6">
					<div className="flex flex-col gap-2">
						<span className="text-sm font-medium leading-none">
							Completion Reward (WLD)
						</span>

						<span className="flex h-10 w-full rounded-md border border-primary/20 bg-white px-3 py-2 text-sm ">
							{data?.data?.reward}
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm font-medium leading-none">Category</span>

						<span className="flex h-10 w-full rounded-md border border-primary/20 bg-white px-3 py-2 text-sm ">
							{data?.data?.category?.name || "N/A"}
						</span>
					</div>

					{Array.isArray(questions) &&
						questions.map((question, question_index) => (
							<div className="space-y-6" key={`question-${question_index}`}>
								<div>
									<span className="text-sm font-medium leading-none">
										Task {question_index + 1}
									</span>
									<span className="flex h-10 w-full rounded-md border border-primary/20 bg-white px-3 py-2 text-sm">
										{question.question}
									</span>
								</div>

								<div className="flex flex-col gap-2">
									<span className="text-sm font-medium leading-none">
										Response type
									</span>
									<span className="flex h-10 w-full rounded-md border border-primary/20 bg-white px-3 py-2 text-sm">
										{response_types
											.filter((x) => x.value === question.response_type)
											.map((x, response_index) => (
												<span
													key={`response-type-${response_index}-of-question-${question_index}`}
													className="inline-flex items-center gap-2"
												>
													<x.icon className="text-2xl text-primary" /> {x.name}
												</span>
											))}
									</span>

									{[
										ResponseType.CHECK_BOX,
										ResponseType.RADIO,
										ResponseType.BUBBLES,
										ResponseType.ROUND_BOX,
										ResponseType.BOOLEAN,
										ResponseType.MULTISELECT,
									].includes(question.response_type) && (
										<div className="mt-6 space-y-4 border-y-2 py-6">
											{Array.isArray(question.options) &&
												question.options.map((option, option_index) => (
													<div
														key={`question-${question_index}-option-${option_index}`}
													>
														<div className="flex items-center gap-6">
															<span className="flex h-10 w-full rounded-md border border-primary/20 bg-white px-3 py-2 text-sm ">
																<FaRegCircle className="text-xl" />
																<span className="ml-2">
																	{option.value || `Option ${option_index + 1}`}
																</span>
															</span>

															<div className="flex gap-2">
																<Button
																	type="button"
																	variant={
																		option.point === 0 ? "default" : "outline"
																	}
																	className={cn(
																		"size-8",
																		option.point === 0
																			? "hover:bg-primary hover:text-white"
																			: "border-gray-400 text-black "
																	)}
																	onClick={() => {
																		setValue(
																			`questions.${question_index}.options.${option_index}.point`,
																			0
																		);
																	}}
																>
																	0
																</Button>
																<Button
																	type="button"
																	variant={
																		option.point === 1 ? "default" : "outline"
																	}
																	className={cn(
																		"size-8",
																		option.point === 1
																			? "hover:bg-primary hover:text-white"
																			: "border-gray-400 text-black "
																	)}
																	onClick={() => {
																		setValue(
																			`questions.${question_index}.options.${option_index}.point`,
																			1
																		);
																	}}
																>
																	1
																</Button>
																<Button
																	type="button"
																	variant={
																		option.point === 2 ? "default" : "outline"
																	}
																	className={cn(
																		"size-8",
																		option.point === 2
																			? "hover:bg-primary hover:text-white"
																			: "border-gray-400 text-black "
																	)}
																	onClick={() => {
																		setValue(
																			`questions.${question_index}.options.${option_index}.point`,
																			2
																		);
																	}}
																>
																	2
																</Button>
															</div>
														</div>
													</div>
												))}
										</div>
									)}
								</div>
							</div>
						))}
				</CardContent>
			</Card>

			<Button
				type="submit"
				className="float-right w-full max-w-40"
				disabled={isPending || isPendingMutation}
			>
				{isPendingMutation ? (
					<ImSpinner3 className="mr-1 animate-spin" />
				) : (
					"Save"
				)}
			</Button>

			<ButtonLink
				href={urls.dashboard.tasks.index}
				className="float-right mr-4 w-full max-w-40"
				variant={"outline"}
			>
				Cancel
			</ButtonLink>
		</form>
	);
};

export default EditSesTaskForm;
