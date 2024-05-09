import { Admin, Pagination } from ".";

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
export type GetQuestionnaireCategoryResponse = DeafultResponse<{
	data: {
		id: number;
		name: string;
		slug: string;
		description: string | null;
		createdAt: string;
		updatedAt: string;
	}[];
	pagination: Pagination;
}>;

// NOTE: Survey Category
export type GetSurveyCategoryResponse = DeafultResponse<{
	data: {
		id: number;
		name: string;
		slug: string;
		description: string | null;
		createdAt: string;
		updatedAt: string;
	}[];
	pagination: Pagination;
}>;

// NOTE: Task Category
export type GetTaskCategoryResponse = DeafultResponse<{
	data: {
		id: number;
		name: string;
		slug: string;
		description: string | null;
		createdAt: string;
		updatedAt: string;
	}[];
	pagination: Pagination;
}>;

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
	pagination: Pagination;
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
	pagination: Pagination;
}>;

export type CreateSurveyResponse = DeafultResponse<{}>;

// NOTE: Task
export type GetTasksResponse = DeafultResponse<{
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
	pagination: Pagination;
}>;

export type CreateTaskResponse = DeafultResponse<{}>;
