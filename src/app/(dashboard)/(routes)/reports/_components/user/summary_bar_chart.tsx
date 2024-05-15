"use client";

import { Button } from "@/components/ui/button";
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
	active_users: "#7C56FE",
	inactive_users: "#D6CBFF",
};

const data = [
	{
		name: "Jan",
		registered_users: 4000,
		active_users: 2400,
		inactive_users: 2400,
	},
	{
		name: "Feb",
		registered_users: 3000,
		active_users: 1398,
		inactive_users: 2210,
	},
	{
		name: "Mar",
		registered_users: 2000,
		active_users: 9800,
		inactive_users: 2290,
	},
	{
		name: "Apr",
		registered_users: 2780,
		active_users: 3908,
		inactive_users: 2000,
	},
	{
		name: "May",
		registered_users: 1890,
		active_users: 4800,
		inactive_users: 2181,
	},
	{
		name: "Jun",
		registered_users: 2390,
		active_users: 3800,
		inactive_users: 2500,
	},
	{
		name: "Jul",
		registered_users: 3490,
		active_users: 4300,
		inactive_users: 2100,
	},
	{
		name: "Aug",
		registered_users: 3490,
		active_users: 4300,
		inactive_users: 2100,
	},
	{
		name: "Sep",
		registered_users: 2490,
		active_users: 1900,
		inactive_users: 2100,
	},
	{
		name: "Oct",
		registered_users: 2490,
		active_users: 400,
		inactive_users: 1100,
	},
	{
		name: "Nov",
		registered_users: 3490,
		active_users: 4300,
		inactive_users: 2100,
	},
	{
		name: "Dec",
		registered_users: 2490,
		active_users: 6300,
		inactive_users: 2100,
	},
];

export default function UserSummaryBarChart() {
	const [showActiveUsers, setShowActiveUsers] = React.useState(true);
	const [showInactiveUsers, setShowInactiveUsers] = React.useState(true);
	const [showRegisteredUsers, setShowRegisteredUsers] = React.useState(true);

	return (
		<>
			<div className="mb-8 flex justify-center gap-4">
				<Button
					variant={"plain"}
					size={"plain"}
					className={cn("gap-2", !showRegisteredUsers && "opacity-50")}
					onClick={() => setShowRegisteredUsers((prev) => !prev)}
				>
					<span
						className="flex h-2 w-4"
						style={{ backgroundColor: colors.registered_users }}
					/>{" "}
					<span>Registered users</span>
				</Button>
				<Button
					variant={"plain"}
					size={"plain"}
					className={cn("gap-2", !showActiveUsers && "opacity-50")}
					onClick={() => setShowActiveUsers((prev) => !prev)}
				>
					<span
						className="flex h-2 w-4"
						style={{ backgroundColor: colors.active_users }}
					/>{" "}
					<span>Active users</span>
				</Button>
				<Button
					variant={"plain"}
					size={"plain"}
					className={cn("gap-2", !showInactiveUsers && "opacity-50")}
					onClick={() => setShowInactiveUsers((prev) => !prev)}
				>
					<span
						className="flex h-2 w-4"
						style={{ backgroundColor: colors.inactive_users }}
					/>{" "}
					<span>Inactive users</span>
				</Button>
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
					{showRegisteredUsers && (
						<Bar dataKey="registered_users" fill="#34246B" />
					)}

					{showActiveUsers && <Bar dataKey="active_users" fill="#7C56FE" />}

					{showInactiveUsers && <Bar dataKey="inactive_users" fill="#C3B1FF" />}
				</BarChart>
			</ResponsiveContainer>
		</>
	);
}
