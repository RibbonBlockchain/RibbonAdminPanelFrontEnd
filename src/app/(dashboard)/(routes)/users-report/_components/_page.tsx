"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { TiStarFullOutline } from "react-icons/ti";

const UsersReportPage = () => {
	const [open, setOpen] = React.useState(false);
	return (
		<section className="mb-12 h-full px-4">
			<div className="flex w-full rounded-md bg-white p-4 shadow">
				<div className="flex gap-4">
					<div className="relative">
						<IoSearchOutline className="absolute left-2 top-1/2 -translate-y-1/2" />
						<Input placeholder="Search by location" className="pl-8" />
					</div>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className="flex items-center gap-1 border border-primary/50"
							>
								<HiAdjustmentsHorizontal /> <span>Filter</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="mb-12 min-w-[600px] px-0">
							<div className="flex justify-between gap-4 border-b px-6 py-2">
								<h3 className="text-xl font-semibold">Filter</h3>

								<Button
									onClick={() => setOpen(false)}
									variant={"plain"}
									size={"plain"}
									className="text-xl"
								>
									<IoMdClose /> <span className="sr-only">Close Filter</span>
								</Button>
							</div>

							<form className="grid grid-cols-3 gap-4 ">
								<div className="col-span-2 my-6 grid grid-cols-2 gap-y-4 border-r px-4 py-6">
									<div className="col-span-full">
										<Label>Location</Label>
										<Input placeholder="country" />
									</div>
									<div className="col-span-full">
										<Label>Total rewards earned</Label>
										<div className="flex gap-4">
											<Input placeholder="Min" />
											<Input placeholder="Max" />
										</div>
									</div>
									<div className="col-span-full">
										<Label>Daily rewards earned</Label>
										<div className="flex gap-4">
											<Input placeholder="Min" />
											<Input placeholder="Max" />
										</div>
									</div>
									<div className="col-span-full">
										<Label>User SES</Label>
										<div className="flex gap-4">
											<Input placeholder="Min" />
											<Input placeholder="Max" />
										</div>
									</div>
								</div>
								<div>
									<span>Activities completed</span>
									<div className="flex items-center gap-2">
										<Input type="radio" className="size-5 accent-primary" />
										<Label>Questionnaires</Label>
									</div>
									<div className="flex items-center gap-2">
										<Input type="radio" className="size-5 accent-primary" />
										<Label>Surveys</Label>
									</div>
									<div className="flex items-center gap-2">
										<Input type="radio" className="size-5 accent-primary" />
										<Label>Tasks</Label>
									</div>

									<br />

									<span>Average ratings</span>
									<div className="flex items-center gap-2">
										<Input type="checkbox" className="size-5 accent-primary" />
										<Label className="flex h-4 items-center">
											(5) <TiStarFullOutline className="fill-golden text-xl" />
										</Label>
									</div>
									<div className="flex items-center gap-2">
										<Input type="checkbox" className="size-5 accent-primary" />
										<Label className="flex h-4 items-center">
											(4) <TiStarFullOutline className="fill-golden text-xl" />
										</Label>
									</div>
									<div className="flex items-center gap-2">
										<Input type="checkbox" className="size-5 accent-primary" />
										<Label className="flex h-4 items-center">
											(3) <TiStarFullOutline className="fill-golden text-xl" />
										</Label>
									</div>
									<div className="flex items-center gap-2">
										<Input type="checkbox" className="size-5 accent-primary" />
										<Label className="flex h-4 items-center">
											(2) <TiStarFullOutline className="fill-golden text-xl" />
										</Label>
									</div>
									<div className="flex items-center gap-2">
										<Input type="checkbox" className="size-5 accent-primary" />
										<Label className="flex h-4 items-center">
											(1) <TiStarFullOutline className="fill-golden text-xl" />
										</Label>
									</div>
								</div>
								<div className="col-span-full flex w-full gap-6 border-t p-6 pb-2">
									<Button variant={"faint"} className="w-full">
										Reset Filters
									</Button>
									<Button className="w-full">Apply Filters</Button>
								</div>
							</form>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</section>
	);
};

export default UsersReportPage;
