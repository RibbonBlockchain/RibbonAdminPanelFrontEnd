import React from "react";

import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti";

import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UsersReportFilter = () => {
	const [open, setOpen] = React.useState(false);

	return (
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

				<form className="grid grid-cols-3 gap-4 px-2">
					<div className="col-span-2 my-6 grid grid-cols-2 gap-y-4 border-r py-6 pl-4 pr-6">
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

					<div className="col-span-1 my-6 py-6 pl-3 pr-3">
						<fieldset className="flex flex-col gap-4">
							<span className="text-sm font-semibold opacity-60">
								Activities completed
							</span>
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
						</fieldset>

						<br />

						<fieldset className="flex flex-col gap-4">
							<span className="text-sm font-semibold opacity-60">
								Average ratings
							</span>
							<div className="flex items-center gap-2">
								<Input type="checkbox" className="size-5 accent-primary" />
								<Label className="flex h-4 items-center">
									(5) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input type="checkbox" className="size-5 accent-primary" />
								<Label className="flex h-4 items-center">
									(4) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input type="checkbox" className="size-5 accent-primary" />
								<Label className="flex h-4 items-center">
									(3) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input type="checkbox" className="size-5 accent-primary" />
								<Label className="flex h-4 items-center">
									(2) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input type="checkbox" className="size-5 accent-primary" />
								<Label className="flex h-4 items-center">
									(1) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
						</fieldset>
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
	);
};

export default UsersReportFilter;
