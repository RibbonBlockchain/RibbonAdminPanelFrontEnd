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
	month: string;
	paid_out: number;
	total_tokens: number;
};

const RewardPaidOutChart: React.FC<Props> = (props) => {
	const data02 = [
		{
			name: "Paid Out",
			value: props.paid_out,
		},
		{
			name: "Max Tokens",
			value: props.total_tokens - props.paid_out,
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
							className="max-w-[100px] font-bold text-white"
							fill="#7C56FE"
						>
							{props.paid_out}
						</Label>
					</Pie>
				</PieChart>
			</ResponsiveContainer>
			<div className="flex flex-col items-center justify-center">
				<p>
					Tokens paid out in <span className="capitalize">{props.month}</span>
				</p>
				<p className="text-primary-500">{props.paid_out} WLD tokens</p>
			</div>
		</div>
	);
};

export default RewardPaidOutChart;
