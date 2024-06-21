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

const SurveysTab = () => {
	return (
		<>
			<Table>
				<TableHeader className="h-20 border-black-neutral/20 bg-white">
					<TableRow>
						<TableHead>
							<div className="flex items-center gap-3">
								<span>Categories</span>
								<Select>
									<SelectTrigger className="w-[100px]">
										<SelectValue placeholder="Theme" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Light</SelectItem>
										<SelectItem value="dark">Dark</SelectItem>
										<SelectItem value="system">System</SelectItem>
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
					{Array.from({ length: 10 }).map((user, index) => (
						<TableRow
							key={`user-${index}`}
							className="cursor-pointer border-black-neutral/20 odd:hover:bg-neutral-100 even:hover:bg-neutral-100/50"
						>
							<TableCell>Do you have any lungs-related disease?</TableCell>
							<TableCell>Tuberculosis, Lung cancer, Pneumonia</TableCell>
							<TableCell>0.5 wld</TableCell>
							<TableCell>4</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default SurveysTab;
