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

export type GetQuestionnaireCategoryResponse = DeafultResponse<{}>;

export type SendNotificationResponse = DeafultResponse<{}>;
