"use client";

import EmptySvg from "@/components/svgs/empty";
import FlameSvg from "@/components/svgs/flame";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/utils";
import { taskService } from "@/services/tasks";
import React from "react";
import { SlOptions } from "react-icons/sl";
import { GoPlus } from "react-icons/go";
import { BiEdit } from "react-icons/bi";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbTrash } from "react-icons/tb";
import { LuUndo2 } from "react-icons/lu";
import PaginateSection from "@/components/sections/paginate_section";
import { useToken } from "@/components/providers/token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { UpdateStatusRequest } from "@/types/request";
import StatusActiveModal from "@/app/(dashboard)/_components/status_active_modal";
import StatusCloseModal from "@/app/(dashboard)/_components/status_close_modal";
import urls from "@/lib/urls";
import Link from "next/link";
import ErrorScreen from "@/components/sections/error";

type Props = {
	searchParams: {
		q?: string;
		page?: string;
		pageSize?: string;
	};
};

const TasksList: React.FC<Props> = (props) => {
	const qc = useQueryClient();
	const [id, setId] = React.useState<number | null>(null);
	const [statusActiveModalOpen, setStatusActiveModalOpen] =
		React.useState(false);

	const [statusClosedModalOpen, setStatusClosedModalOpen] =
		React.useState(false);

	const { token } = useToken();

	const { data, error, refetch } = useQuery({
		queryKey: ["tasks", props.searchParams],
		queryFn: () => taskService.getAll(props.searchParams, token || ""),
		enabled: !!token,
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ["Update Task Status"],
		mutationFn: async (data: UpdateStatusRequest) =>
			taskService.updateStatus(data, token || ""),
		onSuccess(data) {
			toast({
				title: "Success",
				description: data.message,
				duration: 5000,
			});
			qc.refetchQueries({
				queryKey: ["tasks"],
				type: "all",
			});
			qc.refetchQueries({
				queryKey: ["task summary"],
				type: "all",
			});
			handleActiveModalClose();
			handleClosedModalClose();
		},
		onError(error) {
			toast({
				title: "Error",
				description: getErrorMessage(error),
				duration: 5000,
				variant: "destructive",
			});
		},
	});

	function handleActiveModalOpen(id: number) {
		setId(id);
		setStatusActiveModalOpen(true);
	}

	function handleClosedModalOpen(id: number) {
		setId(id);
		setStatusClosedModalOpen(true);
	}

	function handleActiveModalClose() {
		setId(null);
		setStatusActiveModalOpen(false);
	}

	function handleClosedModalClose() {
		setId(null);
		setStatusClosedModalOpen(false);
	}

	if (error) return <ErrorScreen error={error} reset={refetch} />;

	return (
		<div className="my-12 w-full px-4">
			{data?.data && data?.data.data && data?.data.data.length > 0 ? (
				<>
					<ul className="flex flex-col gap-4">
						{data?.data.data?.map((task) => (
							<li
								key={`task-${task.id}`}
								className="flex items-center justify-between rounded-2xl bg-white p-4"
							>
								<div className="grid grow grid-cols-7 gap-6">
									<div className="col-span-2 flex flex-col gap-1">
										<span className="font-semibold">{task.name}</span>
										<span className="text-xs text-black-neutral">
											{task.id} questions
										</span>
									</div>
									<div className="col-span-5 flex gap-2 self-start">
										{/* <span
											className={cn(
												"flex h-6 max-w-fit items-center rounded-md px-1 text-xs lowercase",
												{
													"bg-green-100": task.type === "QUESTIONNAIRE",
													"bg-red-100": task.type === "APP",
												}
											)}
										>
											{task.type}
										</span> */}
										<span className="flex h-6 items-center gap-1 rounded-md bg-[#FEF5E7] px-2 text-xs text-[#DF900A]">
											<FlameSvg />
											<span className="mt-1">{task.reward} responses</span>
										</span>
									</div>
								</div>
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<Button variant={"plain"}>
											<SlOptions />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="z-10 mr-4 p-4 font-medium text-primary">
										<DropdownMenuItem asChild>
											<Link
												href={urls.dashboard.tasks.edit.index(
													task.id.toString()
												)}
											>
												<BiEdit className="mr-2 text-2xl" />
												Edit
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem asChild>
											<Link
												href={urls.dashboard.tasks.edit.ses(task.id.toString())}
											>
												<GoPlus className="mr-2 text-2xl" /> Add SES score
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										{task.status === "CLOSED" && (
											<DropdownMenuItem className="text-green-500" asChild>
												<button
													type="button"
													className="w-full"
													onClick={() => handleActiveModalOpen(task.id)}
												>
													<LuUndo2 className="mr-2 text-2xl" /> Restore
												</button>
											</DropdownMenuItem>
										)}
										{task.status === "ACTIVE" && (
											<DropdownMenuItem className="text-red-500" asChild>
												<button
													type="button"
													className="w-full"
													onClick={() => handleClosedModalOpen(task.id)}
												>
													<TbTrash className="mr-2 text-2xl" />
													Close
												</button>
											</DropdownMenuItem>
										)}
									</DropdownMenuContent>
								</DropdownMenu>
							</li>
						))}
					</ul>

					<PaginateSection
						current_page={data?.data?.pagination?.currentPage || 1}
						total_pages={data?.data?.pagination?.totalPages || 1}
					/>

					<StatusActiveModal
						isOpen={statusActiveModalOpen}
						closeModal={handleActiveModalClose}
						handleAction={() => mutate({ id: id as number, status: "ACTIVE" })}
						type={"task"}
						isPending={isPending}
					/>

					<StatusCloseModal
						isOpen={statusClosedModalOpen}
						closeModal={handleClosedModalClose}
						handleAction={() => mutate({ id: id as number, status: "CLOSED" })}
						type={"task"}
						isPending={isPending}
					/>
				</>
			) : (
				<div className="my-16 flex h-full flex-col items-center justify-center">
					<EmptySvg />
					<h3 className="mt-4 text-2xl font-semibold">No Tasks</h3>
				</div>
			)}
		</div>
	);
};

export default TasksList;
