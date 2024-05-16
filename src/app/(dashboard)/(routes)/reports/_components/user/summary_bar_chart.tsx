"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GetAllUsersReportResponse } from "@/types/response";
import React, { useMemo } from "react";
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

type Props = {
	data: {
		id: string;
		name: string;
		active: number;
		inactive: number;
	}[];
};

const UserSummaryBarChart: React.FC<Props> = (props) => {
	const data = useMemo(() => {
		return props.data.map((item) => ({
			name: item.id,
			registered_users: item.active + item.inactive,
			active_users: item.active,
			inactive_users: item.inactive,
		}));
	}, [props.data]);

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
};

export default UserSummaryBarChart;
