"use client";

import React from "react";
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
	CreateQuestionnaireSchema,
	CreateQuestionnaireSchemaType,
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
import { useQuery } from "@tanstack/react-query";
import { questionnaireCategoryService } from "@/services/questionnaire_category";

const empty_question = [
	{
		question: "",
		response_type: ResponseType.SHORT_TEXT,
		options: [""],
	},
];

const CreateQuestionnaireForm = () => {
	const { data, isPending } = useQuery({
		queryKey: ["questionnaire"],
		queryFn: questionnaireCategoryService.getAll,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		watch,
	} = useForm<CreateQuestionnaireSchemaType>({
		mode: "onSubmit",
		resolver: zodResolver(CreateQuestionnaireSchema),
		defaultValues: {
			reward: 0,
			questions: empty_question,
		},
	});

	const [questions, category] = watch(["questions", "category"]);

	const onSubmit = handleSubmit(async (data) => {
		// mutate(data);

		console.log(data);
	});

	function duplicateQuestion(index: number) {
		const newQuestions = [...questions];
		newQuestions.splice(index + 1, 0, questions[index]);
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
		if (questions.length >= 10) {
			return;
		}
		const newQuestions = [...questions];

		newQuestions.splice(index + 1, 0, empty_question[0]);

		setValue("questions", newQuestions);
	}

	function deleteOption(questionIndex: number, optionIndex: number) {
		if (questions[questionIndex].options.length <= 1) {
			return setValue(`questions.${questionIndex}.options`, [""]);
		}
		const newQuestions = [...questions];
		newQuestions[questionIndex].options.splice(optionIndex, 1);
		setValue("questions", newQuestions);
	}

	function addOption(questionIndex: number) {
		const newQuestions = [...questions];
		newQuestions[questionIndex].options.push("");
		setValue("questions", newQuestions);
	}

	return (
		<form
			onSubmit={onSubmit}
			className="mx-auto my-16 w-full max-w-4xl space-y-10 px-6"
		>
			{/* {JSON.stringify(data)} */}
			<Card className="pb-8 transition-all duration-500">
				<CardHeader>
					<CardTitle>Submit Questionnaires manually</CardTitle>
					<CardDescription>Upload maximum of 10 questions</CardDescription>
				</CardHeader>

				<CardContent className="mx-auto max-w-3xl space-y-6">
					<div>
						<Label>Completion Reward (WLD)</Label>
						<Input
							type="number"
							min={0}
							placeholder="Type an amount e.g: 5 WLD"
							{...register("reward")}
						/>
						<ErrorMessage>{errors.reward?.message}</ErrorMessage>
					</div>

					<div>
						<Label>Category</Label>
						<Select
							{...register("category")}
							value={category}
							onValueChange={(v) => setValue("category", v)}
						>
							<SelectTrigger className="">
								<SelectValue
									className="placeholder:text-neutral-500"
									placeholder="Choose a category"
								/>
							</SelectTrigger>
							<SelectContent className="max-w-sm">
								<SelectItem value="light">Light</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="system">System</SelectItem>
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
									{errors.questions?.[question_index]?.question?.message}
								</ErrorMessage>
							</div>

							<div>
								<Label>Response type</Label>
								<Select
									{...register(`questions.${question_index}.response_type`)}
									value={questions[question_index].response_type}
									onValueChange={(v) =>
										setValue(
											`questions.${question_index}.response_type`,
											v as ResponseType
										)
									}
								>
									<SelectTrigger className="">
										<SelectValue
											className="placeholder:text-neutral-500"
											placeholder="Choose a category"
										/>
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
								].includes(questions[question_index].response_type) && (
									<div className="mt-6 space-y-4 border-y-2 py-6">
										{questions[question_index].options.map(
											(option, option_index) => (
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
																	`questions.${question_index}.options.${option_index}`
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
									</div>
								)}
							</div>

							<div className="flex justify-end gap-3">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												disabled={questions.length > 9}
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
									disabled={questions.length > 10}
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

			<Button className="float-right">Submit questions</Button>
		</form>
	);
};

export default CreateQuestionnaireForm;
