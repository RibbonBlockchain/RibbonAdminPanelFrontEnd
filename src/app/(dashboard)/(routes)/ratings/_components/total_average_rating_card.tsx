"use client";

import { TiStarFullOutline } from "react-icons/ti";
import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import TotalAverageRatingSvg from "@/components/svgs/total_average_rating";

type Props = {
	average_rating: string;
};

const COLORS = ["#7C56FE", "#D6CBFF"];

const TotalAverageRatingCard: React.FC<Props> = (props) => {
	const data = [
		{
			name: "Page A",
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
		{
			name: "Page B",
			uv: 3000,
			pv: 1398,
			amt: 2210,
		},
		{
			name: "Page C",
			uv: 2000,
			pv: 9800,
			amt: 2290,
		},
		{
			name: "Page D",
			uv: 2780,
			pv: 3908,
			amt: 2000,
		},
		{
			name: "Page E",
			uv: 1890,
			pv: 4800,
			amt: 2181,
		},
		{
			name: "Page F",
			uv: 2390,
			pv: 3800,
			amt: 2500,
		},
		{
			name: "Page G",
			uv: 3490,
			pv: 4300,
			amt: 2100,
		},
	];
	return (
		<div className="rounded-xl bg-gradient-to-r from-white from-[60%] to-[#EBE8FD] px-4 py-8 shadow">
			<h2 className="text-nowrap text-lg font-bold">Total average ratings</h2>

			<div className="flex h-full items-center justify-between gap-x-12 pr-6">
				<div className="col-span-2 flex items-center text-3xl">
					<span className="font-semibold">{props.average_rating}</span>
					<TiStarFullOutline className="text-2xl text-golden" />
				</div>

				<TotalAverageRatingSvg />
			</div>
		</div>
	);
};

export default TotalAverageRatingCard;
