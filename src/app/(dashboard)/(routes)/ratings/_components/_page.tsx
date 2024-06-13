"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import QuestionnaireRatingsTab from "./tabs/questionnaire";
import SurveyRatingsTab from "./tabs/surveys";
import TaskRatingsTab from "./tabs/tasks";

type Props = {
	type: "q" | "s" | "t";
};

const RatingPage: React.FC<Props> = (props) => {
	const router = useRouter();
	function handleTabChange(tab: "q" | "s" | "t") {
		const url = new URL(window.location.href);

		url.searchParams.set("type", tab);

		router.push(url.href);
	}

	return (
		<Tabs
			defaultValue="reward"
			value={props.type}
			className="mx-auto mt-4 w-full"
		>
			<TabsList className="w-full gap-x-6 bg-transparent ">
				<TabsTrigger onClick={() => handleTabChange("q")} value="q">
					Questionnaire
				</TabsTrigger>
				<TabsTrigger onClick={() => handleTabChange("s")} value="s">
					Surveys
				</TabsTrigger>
				<TabsTrigger onClick={() => handleTabChange("t")} value="t">
					Tasks
				</TabsTrigger>
			</TabsList>
			<TabsContent value="q" className="my-12">
				<QuestionnaireRatingsTab />
			</TabsContent>
			<TabsContent value="s" className="my-12">
				<SurveyRatingsTab />
			</TabsContent>
			<TabsContent value="t" className="my-12">
				<TaskRatingsTab />
			</TabsContent>
		</Tabs>
	);
};

export default RatingPage;
