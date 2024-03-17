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
	data: {
		id: number;
		avatar?: null;
		firstName: string;
		lastName: string;
		email: string;
		phone?: string;
		role: "SUPER_ADMIN" | "ADMIN";
		status: "ACTIVE" | "INACTIVE";
		createdAt: string;
		updatedAt: string;
	};
};
