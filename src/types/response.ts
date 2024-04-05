import { Admin } from ".";

type DeafultResponse = {
	status: number;
	message: string;
	timestamp: string;
};

export type LoginResponse = DeafultResponse & {
	data: {
		accessToken: string;
	};
};

export type UserProfileResponse = DeafultResponse & {
	data: Admin;
};
