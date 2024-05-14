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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/ui/error_message";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	EditQuestionnaireSchema,
	EditQuestionnaireSchemaType,
} from "@/schemas";
import { useForm } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { LuCopy } from "react-icons/lu";
import { TbTrash } from "react-icons/tb";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { response_types } from "@/lib/constants";
import { ResponseType } from "@/types/enums";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "@/services/categories";
import {
	CreateQuestionnaireRequest,
	EditQuestionnaireRequest,
} from "@/types/request";
import { toast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import urls from "@/lib/urls";
import { ImSpinner3 } from "react-icons/im";
import { questionnaireService } from "@/services/questionnaire";
import { useToken } from "@/components/providers/token";
import CreateCategoryForm from "@/app/(dashboard)/_components/create_category_form";
import { ButtonLink } from "@/components/ui/button_link";

const empty_question: EditQuestionnaireSchemaType["questions"] = [
	{
		id: null,
		question: "",
		response_type: ResponseType.SHORT_TEXT,
		options: [],
	},
];

const EditQuestionnaireForm = () => {
	const params = useParams();
	const qc = useQueryClient();
	const router = useRouter();
	const { token } = useToken();

	const { data, isPending } = useQuery({
		queryKey: ["questionnaire", { id: params?.id as string }],
		queryFn: () =>
			questionnaireService.getById(params?.id as string, token || ""),
		enabled: !!params?.id && !!token,
	});

	const { data: categoriesData, isPending: isPendingCategories } = useQuery({
		queryKey: ["questionnaire categories"],
		queryFn: () =>
			categoriesService.getQuestionnaireCategories(
				{ pageSize: "1000" },
				token || ""
			),
		enabled: !!params?.id && !!token,
	});

	const { mutate, isPending: isPendingMutation } = useMutation({
		mutationKey: ["edit questionnaire"],
		mutationFn: (data: EditQuestionnaireRequest) =>
			questionnaireService.edit(data, token || ""),

		onSuccess(data) {
			toast({
				title: "Success",
				description: data.message,
				duration: 5000,
			});
			reset();
			qc.refetchQueries({ queryKey: ["questionnaire"], type: "all" });
			router.push(urls.dashboard.questionnaires.index);
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
		mutate: mutateCategory,
		isPending: isPendingCategoryMutation,
		isSuccess: isSuccessCategoryMutation,
	} = useMutation({
		mutationKey: ["create questionnaire category"],
		mutationFn: (data: { name: string }) =>
			categoriesService.createQuestionnaireCategory(data, token || ""),
		onSuccess(data) {
			toast({
				title: "Success",
				description: data.message,
				duration: 5000,
			});
			qc.refetchQueries({
				queryKey: ["questionnaire categories"],
				type: "all",
			});
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
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		watch,
	} = useForm<EditQuestionnaireSchemaType>({
		mode: "onSubmit",
		resolver: zodResolver(EditQuestionnaireSchema),
		defaultValues: {
			reward: 0,
			questions: empty_question,
		},
	});

	const [questions, category] = watch(["questions", "category"]);

	const onSubmit = handleSubmit(async (data) => {
		const formattedData = data.questions.map((question) => ({
			id: question.id,
			type: question.response_type,
			question: question.question,
			options: question.options,
		}));

		mutate({
			id: parseInt(params?.id as string),
			categoryId: data.category,
			reward: data.reward,
			questions: formattedData,
		});
	});

	function duplicateQuestion(index: number) {
		const newQuestions = [...questions];
		newQuestions.splice(index + 1, 0, { ...questions[index], id: null });
		setValue("questions", newQuestions);
	}

	function deleteQuestion(index: number) {
		if (questions.length <= 1) {
			return setValue("questions", empty_question);
		}
		const newQuestions = [...questions];
		newQuestions.splice(index, 1);
		setValue("questions", newQuestions);
	}

	function addQuestion(index: number) {
		if (questions.length >= +process.env.NEXT_PUBLIC_QUESTIONNAIRE_LIMIT) {
			return;
		}
		const newQuestions = [...questions];

		newQuestions.splice(index + 1, 0, empty_question[0]);

		setValue("questions", newQuestions);
	}

	function deleteOption(questionIndex: number, optionIndex: number) {
		if (questions[questionIndex].options.length <= 1) {
			return setValue(`questions.${questionIndex}.options`, [
				{
					id: null,
					point: 0,
					value: "",
				},
			]);
		}
		const newQuestions = [...questions];
		newQuestions[questionIndex].options.splice(optionIndex, 1);
		setValue("questions", newQuestions);
	}

	function addOption(questionIndex: number) {
		const newQuestions = [...questions];
		newQuestions[questionIndex].options.push({
			id: null,
			point: 0,
			value: "",
		});
		setValue("questions", newQuestions);
	}

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (data?.data) {
			timer = setTimeout(() => {
				reset(
					{
						reward: data?.data?.reward,
						category: data?.data?.category?.id,
						questions: Array.isArray(data?.data?.questions)
							? data?.data?.questions?.map((q) => ({
									id: q.id,
									question: q.text,
									response_type: q.type,
									options:
										q.options?.map((o) => ({
											id: o.id,
											value: o.text,
											point: o.point,
										})) || [],
								}))
							: empty_question,
					},
					{ keepValues: false }
				);
			}, 100);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [reset, data?.data]);

	if (isPending) return <p className="p-4">Loading...</p>;

	return (
		<form
			onSubmit={onSubmit}
			className="mx-auto my-16 w-full max-w-4xl space-y-10 px-6"
		>
			<Card className="pb-8 transition-all duration-500">
				<CardHeader>
					<CardTitle>Edit {data?.data?.name || "Questionnaire"} </CardTitle>
					<CardDescription>
						Upload maximum of {+process.env.NEXT_PUBLIC_QUESTIONNAIRE_LIMIT}{" "}
						questions
					</CardDescription>
				</CardHeader>

				<CardContent className="mx-auto max-w-3xl space-y-6">
					<div>
						<Label>Completion Reward (WLD)</Label>
						<Input
							type="number"
							step={0.000001}
							formNoValidate
							placeholder="Type an amount e.g: 5 WLD"
							{...register("reward")}
						/>
						<ErrorMessage>{errors.reward?.message}</ErrorMessage>
					</div>

					<div>
						<Label>Category</Label>
						<Select
							{...register("category")}
							value={category?.toString() || ""}
							onValueChange={(v) => setValue("category", +v)}
						>
							<SelectTrigger className="">
								<SelectValue
									className="placeholder:text-neutral-500"
									placeholder="Choose a category"
								/>
							</SelectTrigger>
							<SelectContent className="max-w-sm">
								<CreateCategoryForm
									mutate={mutateCategory}
									isPending={isPendingCategoryMutation}
									isSuccess={isSuccessCategoryMutation}
								/>
								{Array.isArray(categoriesData?.data?.data) &&
									categoriesData.data.data.map((category) => (
										<SelectItem
											key={`category-${category.id}`}
											value={category.id?.toString() || ""}
											className="cursor-pointer"
										>
											{category.name}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
						<ErrorMessage>{errors.category?.message}</ErrorMessage>
					</div>

					{questions.map((question, question_index) => (
						<fieldset className="space-y-6" key={`question-${question_index}`}>
							<div>
								<Label>Question {question_index + 1}</Label>
								<Input
									type="text"
									placeholder="Type your question"
									{...register(`questions.${question_index}.question`)}
								/>
								<ErrorMessage>
									{errors.questions?.[question_index]?.question?.message ||
										errors.questions?.[question_index]?.id?.message}
								</ErrorMessage>
							</div>

							<div>
								<Label>Response type</Label>
								<Select
									{...register(`questions.${question_index}.response_type`)}
									// defaultValue={question.response_type}
									value={question.response_type}
									onValueChange={(v) =>
										setValue(
											`questions.${question_index}.response_type`,
											v as ResponseType
										)
									}
								>
									<SelectTrigger>
										<span>{question.response_type}</span>
										{/* <SelectValue
											className="placeholder:text-neutral-500"
											placeholder="Choose a category"
										/> */}
									</SelectTrigger>
									<SelectContent className="max-w-sm">
										{response_types.map((x) => (
											<SelectItem key={x.value} value={x.value}>
												<span className="inline-flex items-center gap-2">
													<x.icon className="text-2xl text-primary" /> {x.name}
												</span>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<ErrorMessage>
									{errors.questions?.[question_index]?.response_type?.message}
								</ErrorMessage>

								{[
									ResponseType.CHECK_BOX,
									ResponseType.RADIO,
									ResponseType.BUBBLES,
									ResponseType.ROUND_BOX,
									ResponseType.BOOLEAN,
									ResponseType.MULTISELECT,
								].includes(
									questions[question_index].response_type as ResponseType
								) && (
									<div className="mt-6 space-y-4 border-y-2 py-6">
										{questions[question_index].options.map(
											(_, option_index) => (
												<fieldset
													key={`question-${question_index}-option-${option_index}`}
												>
													<div className="flex items-center gap-2">
														<div className="relative w-full">
															<FaRegCircle className="absolute left-2 top-1/2 -translate-y-1/2" />
															<Input
																type="text"
																placeholder={`Option ${option_index + 1}`}
																className="pl-8"
																{...register(
																	`questions.${question_index}.options.${option_index}.value`
																)}
															/>
														</div>

														<Button
															variant={"plain"}
															aria-describedby="delete option"
															onClick={() =>
																deleteOption(question_index, option_index)
															}
															className="size-10 rounded-full p-0 text-xl hover:text-red-500"
														>
															<IoCloseCircleOutline />
														</Button>
													</div>
													<ErrorMessage>
														{
															errors.questions?.[question_index]?.options?.[
																option_index
															]?.message
														}
													</ErrorMessage>
												</fieldset>
											)
										)}

										<Button
											type="button"
											variant={"plain"}
											className="px-2 text-primary hover:bg-primary/10"
											onClick={() => addOption(question_index)}
										>
											Add option +
										</Button>
										<div>
											<ErrorMessage>
												{errors.questions?.[question_index]?.options?.message}
											</ErrorMessage>
										</div>
									</div>
								)}
							</div>

							<div className="flex justify-end gap-3">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												disabled={
													questions.length >=
													+process.env.NEXT_PUBLIC_QUESTIONNAIRE_LIMIT
												}
												type="button"
												variant={"plain"}
												aria-describedby="duplicate question"
												className="size-10 rounded-full p-0 text-xl hover:text-primary"
												onClick={() => duplicateQuestion(question_index)}
											>
												<LuCopy className="rotate-90" />
											</Button>
										</TooltipTrigger>
										<TooltipContent className="bg-black-primary/50 text-white">
											<p>duplicate</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												type="button"
												variant={"plain"}
												aria-describedby="delete question"
												className="size-10 rounded-full p-0 text-xl hover:text-red-500"
												onClick={() => deleteQuestion(question_index)}
											>
												<TbTrash />
											</Button>
										</TooltipTrigger>
										<TooltipContent className="bg-black-primary/50 text-white">
											<p>delete</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<Button
									disabled={
										questions.length >=
										+process.env.NEXT_PUBLIC_QUESTIONNAIRE_LIMIT
									}
									type="button"
									variant={"plain"}
									className="px-2 text-primary hover:bg-primary/10"
									onClick={() => addQuestion(question_index)}
								>
									+ Add more questions
								</Button>
							</div>
						</fieldset>
					))}
				</CardContent>
			</Card>

			<Button
				type="submit"
				className="float-right w-full max-w-40"
				disabled={
					isPending ||
					isPendingCategories ||
					isPendingMutation ||
					isPendingCategoryMutation
				}
			>
				{isPendingMutation ? (
					<ImSpinner3 className="mr-1 animate-spin" />
				) : (
					"Save"
				)}
			</Button>
			<ButtonLink
				href={urls.dashboard.surveys.index}
				className="float-right mr-4 w-full max-w-40"
				variant={"outline"}
			>
				Cancel
			</ButtonLink>
		</form>
	);
};

export default EditQuestionnaireForm;
