"use client";

import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { RxCaretDown } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CreateVaultSchemaType } from "@/schemas";

type Props = {
	selectedValue: CreateVaultSchemaType["type"];
	setSelectedValue: (v: CreateVaultSchemaType["type"]) => void;

	items: CreateVaultSchemaType["type"][];
};

const InputDropdown: React.FC<Props> = (props) => {
	const [open, setOpen] = React.useState(false);

	const [search, setSearch] = React.useState<string>("");

	const list_of_programs = React.useMemo(() => {
		if (search) {
			return props.items.filter(
				(program) =>
					program.name.toLowerCase().includes(search.toLowerCase()) ||
					program.ticker.toLowerCase().includes(search.toLowerCase())
			);
		}

		return props.items;
	}, [search, props.items]);

	return (
		<DropdownMenu onOpenChange={setOpen} open={open}>
			<DropdownMenuTrigger asChild>
				{props.selectedValue ? (
					<Button
						variant={"plain"}
						size={"plain"}
						className="flex items-center gap-x-2 rounded-full border px-2 py-1"
					>
						<props.selectedValue.image />
						<figcaption className="flex items-center text-black">
							<span className=" text-xs">{props.selectedValue?.ticker}</span>

							<RxCaretDown className="text-lg" />
						</figcaption>
					</Button>
				) : (
					<Button>Open</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-80 pt-4">
				<div className="flex items-center justify-between gap-4 pl-4 pr-2">
					<Label>Select a token</Label>
					<Button
						variant={"plain"}
						size={"plain"}
						className="p-0"
						onClick={() => setOpen(false)}
					>
						<IoIosClose className="text-2xl" />
						<span className="sr-only">Close</span>
					</Button>
				</div>
				<div className="relative mx-4 mb-6 mt-2">
					<CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
					<Input
						className="h-8 pl-10"
						placeholder="Search name"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuLabel>Tokens</DropdownMenuLabel>

				{Array.isArray(list_of_programs) && list_of_programs.length > 0 ? (
					<ul className="flex flex-col gap-3 py-2">
						{list_of_programs.map((program, index) => (
							<li key={`list-of-tokens-${index}`}>
								<DropdownMenuItem
									onClick={() => props.setSelectedValue(program)}
								>
									<figure className="flex items-center gap-x-1">
										<program.image />
										<figcaption className="text-xs font-medium">
											{program.name}
										</figcaption>
									</figure>
								</DropdownMenuItem>
							</li>
						))}
					</ul>
				) : (
					<p className="px-2 py-4 text-xs text-gray-500">No token found</p>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default InputDropdown;
