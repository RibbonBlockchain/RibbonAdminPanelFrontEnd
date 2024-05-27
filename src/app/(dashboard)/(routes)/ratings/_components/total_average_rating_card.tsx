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

type Props = {
	rated_status: number;
	unrated_status: number;
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
		<div className="rounded-xl bg-white px-4 py-8">
			<h2 className="text-nowrap text-lg font-bold">Total average ratings</h2>

			<div className="grid grid-cols-5 items-center gap-x-12">
				<div className="col-span-1 flex items-center text-3xl">
					<span className="font-semibold">4.8</span>
					<TiStarFullOutline className="text-golden text-2xl" />
				</div>

				<ResponsiveContainer
					width={"100%"}
					height={200}
					className={"col-span-4"}
				>
					<BarChart
						// width={500}
						// height={300}
						data={data}
						margin={{
							top: 20,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" className="hidden" />
						<XAxis dataKey="name" className="hidden" />
						<YAxis className="hidden" />
						<Tooltip />
						{/* <Legend className="hidden" /> */}
						<Bar dataKey="pv" stackId="a" fill={COLORS[0]} barSize={7} />
						<Bar dataKey="uv" stackId="a" fill={COLORS[1]} barSize={7} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default TotalAverageRatingCard;
