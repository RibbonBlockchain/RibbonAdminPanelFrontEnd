"use client";

import React from "react";
import { BsBarChart } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { GoDash } from "react-icons/go";
import {
	PieChart,
	Pie,
	ResponsiveContainer,
	Tooltip,
	Label,
	Cell,
} from "recharts";

const COLORS = ["#7C56FE", "#D6CBFF"];

type Props = {
	completed_responses: number;
	incompleted_responses: number;
	average_completion_rate: number;
};

const ActivityMonthlyOverviewChart: React.FC<Props> = (props) => {
	const data02 = [
		{
			name: "Completed Responses",
			value: props.completed_responses,
		},
		{
			name: "Incompleted Responses",
			value: props.incompleted_responses,
		},
	];

	return (
		<div className="flex w-full gap-6">
			<ResponsiveContainer width={150} height={150}>
				<PieChart>
					<Tooltip />
					<Pie
						data={data02}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={40}
						outerRadius={50}
						fill="#7C56FE"
						className="relative"
						// label
					>
						{data02.map((_, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
						<Label
							// value="60 Registered users"
							offset={0}
							position="center"
							className="max-w-[100px] font-bold text-white"
							fill="#7C56FE"
						>
							{`${data02.reduce((a, b) => a + b.value, 0)}`}
						</Label>
					</Pie>
				</PieChart>
			</ResponsiveContainer>
			<div className="flex flex-col items-center justify-center">
				<div className="inline-flex items-center gap-4 text-xs">
					<span className="flex h-2 w-4 rounded-full bg-primary" />
					<span className="text-nowrap">Completed Responses</span>
					<span className="flex items-center">
						<FaArrowDown className="text-green-500" />
						{data02[0].value}
					</span>
				</div>
				<div className="mt-8 inline-flex items-center gap-4 text-xs">
					<span className="flex h-2 w-4 rounded-full bg-[#D6CBFF]" />
					<span className="text-nowrap">Incompleted Responses</span>
					<span className="flex items-center">
						<FaArrowUp className="text-red-500" />
						{data02[1].value}
					</span>
				</div>
				<div className="mt-8 inline-flex items-center gap-3 text-xs">
					<BsBarChart className="text-black-neutral" />
					<span className="text-nowrap">Avg. Completion rate</span>
					<span className="flex items-center">
						<GoDash />
						{Math.round(props.average_completion_rate)}%
					</span>
				</div>
			</div>
		</div>
	);
};

export default ActivityMonthlyOverviewChart;
