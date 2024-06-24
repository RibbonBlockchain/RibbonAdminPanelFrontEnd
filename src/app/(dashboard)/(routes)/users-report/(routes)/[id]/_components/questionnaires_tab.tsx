import React from "react";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UserActivity, UserActivityByCategory } from "@/types";

type Props = {
	data?: UserActivityByCategory;
};

const QuestionnairesTab: React.FC<Props> = (props) => {
	const [category, setcategory] = React.useState("");

	const { categories, user_activity } = React.useMemo(() => {
		let categories: string[] = [];
		let user_activity: UserActivity = [];

		if (!props.data || Object.keys(props.data).length === 0) {
			return { categories, user_activity };
		}

		categories = Object.keys(props.data);

		return { categories, user_activity: props.data[category] };
	}, [props.data, category]);

	return (
		<>
			<Table>
				<TableHeader className="h-20 border-black-neutral/20 bg-white">
					<TableRow>
						<TableHead>
							<div className="flex items-center gap-3">
								<span>Categories</span>
								<Select value={category} onValueChange={setcategory}>
									<SelectTrigger className="w-[100px]">
										<SelectValue placeholder="Choose" />
									</SelectTrigger>
									<SelectContent>
										{categories.length > 0 ? (
											categories.map((category, index) => (
												<SelectItem
													key={`q-category-${index}`}
													value={category}
												>
													{category}
												</SelectItem>
											))
										) : (
											<SelectItem key={`q-category-0`} value="">
												No categories
											</SelectItem>
										)}
									</SelectContent>
								</Select>
							</div>
						</TableHead>
						<TableHead>Response</TableHead>
						<TableHead>Reward</TableHead>
						<TableHead>Ratings</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="[&_tr:nth-child(even)]:bg-white [&_tr:nth-child(odd)]:bg-transparent">
					{Array.isArray(user_activity) && user_activity?.length > 0 ? (
						user_activity?.map((user, index) => (
							<TableRow
								key={`user-${index}`}
								className="cursor-pointer border-black-neutral/20 odd:hover:bg-neutral-100 even:hover:bg-neutral-100/50"
							>
								<TableCell>{user.question}</TableCell>
								<TableCell>{user.response}</TableCell>
								<TableCell>{user.reward} wld</TableCell>
								<TableCell>{user.rating}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell>
								{category ? "No data" : "Choose a category"}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
};

export default QuestionnairesTab;
