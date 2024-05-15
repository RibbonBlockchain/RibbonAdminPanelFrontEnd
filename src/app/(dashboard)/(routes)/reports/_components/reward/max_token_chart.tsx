"use client";

import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
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
	total_tokens: number;
};

const RewardMaxTokenChart: React.FC<Props> = (props) => {
	const data02 = [
		{
			name: "Max Tokens",
			value: 0,
		},
		{
			name: "Max Tokens",
			value: props.total_tokens,
		},
	];

	return (
		<div>
			<ResponsiveContainer width={"100%"} height={250}>
				<PieChart>
					<Tooltip />
					<Pie
						data={data02}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={65}
						outerRadius={80}
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
							className="max-w-[100px] font-bold"
							fill="#7C56FE"
						>
							{`${data02.reduce((a, b) => a + b.value, 0)}`}
						</Label>
					</Pie>
				</PieChart>
			</ResponsiveContainer>
			<div className="flex flex-col items-center justify-center">
				<p>Max tokens paid in a month</p>
				<p className="text-primary-500">{props.total_tokens} WLD tokens</p>
			</div>
		</div>
	);
};

export default RewardMaxTokenChart;
