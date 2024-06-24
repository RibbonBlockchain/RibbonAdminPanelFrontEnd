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
import { useSearchParams, useRouter } from "next/navigation";

const UsersReportFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const q = searchParams.get("q") || "";

	const [open, setOpen] = React.useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const url = new URL(window.location.href);

		// url.searchParams.set("q", encodeURIComponent(""));

		if (q) {
			url.searchParams.set("q", q);
		}

		router.push(url.href);

		setOpen(false);
	}

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
					{JSON.stringify({ q }, null, 2)}
					<Button
						onClick={() => setOpen(false)}
						variant={"plain"}
						size={"plain"}
						className="text-xl"
					>
						<IoMdClose /> <span className="sr-only">Close Filter</span>
					</Button>
				</div>

				<form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 px-2">
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
								<Input
									name="activities_completed"
									id="activities_completed_questionnaires"
									type="radio"
									className="size-5 accent-primary"
								/>
								<Label htmlFor="activities_completed_questionnaires">
									Questionnaires
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input
									name="activities_completed"
									id="activities_completed_surveys"
									type="radio"
									className="size-5 accent-primary"
								/>
								<Label htmlFor="activities_completed_surveys">Surveys</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input
									name="activities_completed"
									id="activities_completed_tasks"
									type="radio"
									className="size-5 accent-primary"
								/>
								<Label htmlFor="activities_completed_tasks">Tasks</Label>
							</div>
						</fieldset>

						<br />

						<fieldset className="flex flex-col gap-4">
							<span className="text-sm font-semibold opacity-60">
								Average ratings
							</span>
							<div className="flex items-center gap-2">
								<Input
									id={"rating_5"}
									type="checkbox"
									className="size-5 accent-primary"
								/>
								<Label htmlFor={"rating_5"} className="flex h-4 items-center">
									(5) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input
									id={"rating_4"}
									type="checkbox"
									className="size-5 accent-primary"
								/>
								<Label htmlFor={"rating_4"} className="flex h-4 items-center">
									(4) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input
									id={"rating_3"}
									type="checkbox"
									className="size-5 accent-primary"
								/>
								<Label htmlFor={"rating_3"} className="flex h-4 items-center">
									(3) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input
									id={"rating_2"}
									type="checkbox"
									className="size-5 accent-primary"
								/>
								<Label htmlFor={"rating_2"} className="flex h-4 items-center">
									(2) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<Input
									id={"rating_1"}
									type="checkbox"
									className="size-5 accent-primary"
								/>
								<Label htmlFor={"rating_1"} className="flex h-4 items-center">
									(1) <TiStarFullOutline className="ml-1 fill-golden text-xl" />
								</Label>
							</div>
						</fieldset>
					</div>

					<div className="col-span-full flex w-full gap-6 border-t p-6 pb-2">
						<Button type="reset" variant={"faint"} className="w-full">
							Reset Filters
						</Button>
						<Button type="submit" className="w-full">
							Apply Filters
						</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
};

export default UsersReportFilter;
