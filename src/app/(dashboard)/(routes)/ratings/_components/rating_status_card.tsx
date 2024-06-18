"use client";

import React from "react";

import {
	PieChart,
	Pie,
	ResponsiveContainer,
	Tooltip,
	Label,
	Cell,
} from "recharts";

type Props = {
	rated_status: number;
	unrated_status: number;
	total: number;
};

const COLORS = ["#7C56FE", "#D6CBFF"];

const RatingStatusCard: React.FC<Props> = (props) => {
	const data02 = [
		{
			name: "Rated Status",
			value: props.rated_status || 0,
		},
		{
			name: "Unrated Status",
			value: props.unrated_status || 0,
		},
	];

	return (
		<div className="rounded-xl bg-white px-4 py-8 shadow">
			<h2 className="text-nowrap text-lg font-bold">Rating status</h2>

			<div className="grid grid-cols-5 items-center gap-x-12">
				<div className="col-span-3 flex flex-col gap-y-8">
					<div className="flex justify-between ">
						<span className="flex items-center gap-4">
							<span className="flex size-3 rounded-full bg-primary" />
							Rated activities
						</span>
						<span>{props.rated_status || 0}%</span>
					</div>
					<div className="flex justify-between ">
						<span className="flex items-center gap-4">
							<span className="flex size-3 rounded-full bg-secondary" />
							Unrated activities
						</span>
						<span>{props.unrated_status || 0}%</span>
					</div>
				</div>
				<ResponsiveContainer
					className={"col-span-2"}
					width={"100%"}
					height={200}
				>
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
								className="max-w-[100px] text-2xl font-bold text-white"
								fill="#5E6E82"
							>
								{props.total}
								{/* {`${data02.reduce((a, b) => a + b.value, 0)}`} */}
							</Label>
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default RatingStatusCard;
