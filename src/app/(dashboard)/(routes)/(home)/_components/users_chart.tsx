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

const UsersChart = () => {
	return (
		<>
			<ResponsiveContainer width={"100%"} height={250}>
				<PieChart>
					<Tooltip />
					<Pie
						data={data02}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={60}
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
							className="max-w-[100px] font-bold text-white"
							fill="#7C56FE"
						>
							{`${data02.reduce((a, b) => a + b.value, 0)}`}
						</Label>
					</Pie>
				</PieChart>
			</ResponsiveContainer>

			<div className="inline-flex items-center gap-4 text-xs">
				<span className="flex h-2 w-4 rounded-full bg-primary" />
				<span className="text-nowrap">Active Users</span>
				<span className="flex items-center">
					<FaArrowDown className="text-red-500" />
					{data02[0].value}
				</span>
			</div>
			<div className="mt-8 inline-flex items-center gap-2 text-xs">
				<span className="flex h-2 w-4 rounded-full bg-[#D6CBFF]" />
				<span className="text-nowrap">Inactive Users</span>
				<span className="flex items-center">
					<FaArrowUp className="text-green-500" />
					{data02[1].value}
				</span>
			</div>
		</>
	);
};

const data02 = [
	{
		name: "Active Users",
		value: 4400,
	},
	{
		name: "Inactive Users",
		value: 2567,
	},
];

export default UsersChart;
