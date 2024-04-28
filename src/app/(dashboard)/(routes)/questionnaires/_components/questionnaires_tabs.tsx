"use client";

import EmptySvg from "@/components/svgs/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { questionnaireService } from "@/services/questionnaire";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const QuestionnairesTabs = () => {
	const { data: session } = useSession();

	const { data } = useQuery({
		queryKey: ["questionnaires"],
		queryFn: () => questionnaireService.getAll(session?.user.apiToken || ""),
	});

	return (
		<Tabs defaultValue="manual" className="w-full">
			<TabsList className="gap-x-3 bg-transparent">
				<TabsTrigger value="manual" className="border border-primary/20">
					Manually uploaded
				</TabsTrigger>
				<TabsTrigger value="uploaded" className="border border-primary/20">
					Files uploaded
				</TabsTrigger>
			</TabsList>
			<TabsContent value="manual" className="w-full">
				{JSON.stringify({ data })}
				<div className="my-16 flex h-full flex-col items-center justify-center">
					<EmptySvg />
					<h3 className="mt-4 text-2xl font-semibold">No Questionnaires</h3>
				</div>
			</TabsContent>
			<TabsContent value="uploaded" className="w-full">
				<div className="my-16 flex h-full flex-col items-center justify-center">
					<EmptySvg />
					<h3 className="mt-4 text-2xl font-semibold">No Questionnaires</h3>
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default QuestionnairesTabs;
