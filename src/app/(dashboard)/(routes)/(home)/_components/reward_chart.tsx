"use client";

import React from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const RewardChart = () => {
	return (
		<ResponsiveContainer width={"100%"} height="90%">
			<AreaChart
				data={chart_data}
				margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
			>
				<XAxis dataKey="name" />
				<YAxis tickFormatter={(v) => `${v} WLD`} />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip formatter={(v) => `${v} WLD`} />
				<ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
				<ReferenceLine
					y={4000}
					label="Max"
					stroke="red"
					strokeDasharray="3 3"
				/>
				<Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
			</AreaChart>
		</ResponsiveContainer>
	);
};

const chart_data = [
	{
		name: "Jan",
		value: 100,
	},
	{
		name: "Feb",
		value: 200,
	},
	{
		name: "Mar",
		value: 300,
	},
	{
		name: "Apr",
		value: 150,
	},
	{
		name: "May",
		value: 250,
	},
	{
		name: "Jun",
		value: 350,
	},
	{
		name: "Jul",
		value: 150,
	},
	{
		name: "Aug",
		value: 550,
	},
	{
		name: "Sep",
		value: 250,
	},
	{
		name: "Oct",
		value: 450,
	},
	{
		name: "Nov",
		value: 150,
	},
	{
		name: "Dec",
		value: 50,
	},
];

export default RewardChart;
