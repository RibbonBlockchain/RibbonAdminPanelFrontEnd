import { Admin } from ".";

type DeafultResponse<T> = {
	status: number;
	message: string;
	timestamp: string;
	data: T;
};

export type LoginResponse = DeafultResponse<{
	accessToken: string;
}>;

export type UserProfileResponse = DeafultResponse<Admin>;

export type GetQuestionnaireCategoryResponse = DeafultResponse<
	{
		id: number;
		name: string;
		slug: string;
		description: string;
		createdAt: string;
		updatedAt: string;
	}[]
>;

export type SendNotificationResponse = DeafultResponse<{}>;
