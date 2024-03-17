import React from "react";
import { HiUser } from "react-icons/hi2";
import { Button } from "../ui/button";
import { UserProfileResponse } from "@/types/response";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
import urls from "@/lib/urls";

type Props = {
	data?: UserProfileResponse;
};

const ProfileDropdown: React.FC<Props> = ({ data }) => {
	const router = useRouter();

	function logout() {
		localStorage.removeItem("token");
		router.replace(urls.auth.login());
	}

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button className="flex items-center gap-2 rounded-md bg-primary px-2 py-2 font-bold text-white">
						<HiUser className="text-2xl" />

						<span>
							{data?.data.firstName} {data?.data.lastName}
						</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="mt-1 min-w-40 bg-white shadow">
					<Button variant={"blue"} onClick={logout}>
						Logout
					</Button>
				</PopoverContent>
			</Popover>
		</>
	);
};

export default ProfileDropdown;
