"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const colors = {
	registered_users: "#34246B",
	complete_responses: "#7C56FE",
	incomplete_responses: "#D6CBFF",
};

const data = [
	{
		name: "Jan",
		"Complete responses": 2400,
		"Incomplete responses": 2400,
	},
	{
		name: "Feb",
		"Complete responses": 1398,
		"Incomplete responses": 2210,
	},
	{
		name: "Mar",
		"Complete responses": 9800,
		"Incomplete responses": 2290,
	},
	{
		name: "Apr",
		"Complete responses": 3908,
		"Incomplete responses": 2000,
	},
	{
		name: "May",
		"Complete responses": 4800,
		"Incomplete responses": 2181,
	},
	{
		name: "Jun",
		"Complete responses": 3800,
		"Incomplete responses": 2500,
	},
	{
		name: "Jul",
		"Complete responses": 4300,
		"Incomplete responses": 2100,
	},
	{
		name: "Aug",
		"Complete responses": 4300,
		"Incomplete responses": 2100,
	},
	{
		name: "Sep",
		"Complete responses": 1900,
		"Incomplete responses": 2100,
	},
	{
		name: "Oct",
		"Complete responses": 400,
		"Incomplete responses": 1100,
	},
	{
		name: "Nov",
		"Complete responses": 4300,
		"Incomplete responses": 2100,
	},
	{
		name: "Dec",
		"Complete responses": 6300,
		"Incomplete responses": 2100,
	},
];

type Props = {
	reportToShow: "questionnaire" | "task" | "survey";
	setReportToShow: React.Dispatch<
		React.SetStateAction<"questionnaire" | "task" | "survey">
	>;
	data: {
		id: string;
		name: string;
		completed: number;
		pending: number;
	}[];
};

const ActivitySummaryBarChart: React.FC<Props> = (props) => {
	const [showActiveUsers, setShowActiveUsers] = React.useState(true);
	const [showInactiveUsers, setShowInactiveUsers] = React.useState(true);

	const data = React.useMemo(() => {
		return props.data.map((item) => ({
			name: item.id,
			"Complete responses": item.completed,
			"Incomplete responses": item.pending,
		}));
	}, [props.data]);

	return (
		<>
			<div className="mb-8 flex items-center justify-between">
				<div className="justify-left flex gap-4">
					<Button
						variant={"plain"}
						size={"plain"}
						className={cn("gap-2", !showActiveUsers && "opacity-50")}
						onClick={() => setShowActiveUsers((prev) => !prev)}
					>
						<span
							className="flex h-2 w-4"
							style={{ backgroundColor: colors.complete_responses }}
						/>{" "}
						<span>Completed responses</span>
					</Button>
					<Button
						variant={"plain"}
						size={"plain"}
						className={cn("gap-2", !showInactiveUsers && "opacity-50")}
						onClick={() => setShowInactiveUsers((prev) => !prev)}
					>
						<span
							className="flex h-2 w-4"
							style={{ backgroundColor: colors.incomplete_responses }}
						/>{" "}
						<span>Incompleted responses</span>
					</Button>
				</div>
				<Select
					value={props.reportToShow}
					onValueChange={(v) => props.setReportToShow(v as any)}
				>
					<SelectTrigger className="max-w-32">
						<SelectValue
							className="placeholder:text-neutral-500"
							placeholder="Choose a month"
						/>
					</SelectTrigger>
					<SelectContent className="max-w-sm">
						<SelectItem value={"questionnaire"} className="cursor-pointer">
							Questionnaire
						</SelectItem>
						<SelectItem value={"survey"} className="cursor-pointer">
							Survey
						</SelectItem>
						<SelectItem value={"task"} className="cursor-pointer">
							Task
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<ResponsiveContainer width="100%" height="100%" className={"max-h-96"}>
				<BarChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					{/* <Legend /> */}
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />

					{showActiveUsers && (
						<Bar dataKey="Complete responses" fill="#7C56FE" />
					)}

					{showInactiveUsers && (
						<Bar dataKey="Incomplete responses" fill="#C3B1FF" />
					)}
				</BarChart>
			</ResponsiveContainer>
		</>
	);
};

export default ActivitySummaryBarChart;
