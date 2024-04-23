"use client";

import React from "react";
import { Button } from "../ui/button";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@radix-ui/react-popover";
import { IoIosArrowForward } from "react-icons/io";
import { useSession } from "next-auth/react";

const ProfileDropdown: React.FC = () => {
	const { data: session } = useSession({ required: true });

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={"plain"}
						className="flex h-14 items-center gap-4 rounded-md bg-white px-2 py-2 font-bold text-black-primary"
					>
						<span className="flex size-10 items-center justify-center rounded-full bg-[#E5F1F5] text-lg">
							{session?.user?.firstName?.substring(0, 1)}
							{session?.user?.lastName?.substring(0, 1)}
						</span>

						<span className="inline-flex flex-col items-start">
							<span className="text-base">
								{session?.user?.firstName} {session?.user?.lastName}
							</span>
							<span className="text-xs text-[#626262]">
								{session?.user?.email}
							</span>
						</span>

						<IoIosArrowForward />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="mt-1 min-w-40 rounded-md bg-white px-4 py-6 shadow-md"></PopoverContent>
			</Popover>
		</>
	);
};

export default ProfileDropdown;
