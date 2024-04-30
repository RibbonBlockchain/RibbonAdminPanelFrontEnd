import { Admin } from ".";

type DeafultResponse<T> = {
	status: number;
	message: string;
	timestamp: string;
	data?: T;
};

// NOTE: Authentication
export type LoginResponse = DeafultResponse<{
	accessToken: string;
}>;

// NOTE: User
export type UserProfileResponse = DeafultResponse<Admin>;

// NOTE: Questionnaire Category
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

// NOTE: Questionnaire
export type GetQuestionnaireResponse = DeafultResponse<{
	data: {
		id: number;
		image: null;
		name: string;
		slug: string;
		description: string;
		type: "QUESTIONNAIRE" | "APP";
		reward: number;
		point: number;
		duration: number;
		createdAt: string;
	}[];
}>;

export type CreateQuestionnaireResponse = DeafultResponse<{}>;

// NOTE: Notification
export type SendNotificationResponse = DeafultResponse<{}>;

// NOTE: Survey
export type GetSurveyResponse = DeafultResponse<{
	data: {
		id: number;
		image: null;
		name: string;
		slug: string;
		description: string;
		type: "QUESTIONNAIRE" | "APP";
		reward: number;
		point: number;
		duration: number;
		createdAt: string;
	}[];
}>;

export type CreateSurveyResponse = DeafultResponse<{}>;
