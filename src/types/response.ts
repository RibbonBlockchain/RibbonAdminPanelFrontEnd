import { Admin, Pagination } from ".";

type DefaultResponse<T> = {
	status: number;
	message: string;
	timestamp: string;
	data: T | null;
};

// NOTE: Authentication
export type LoginResponse = DefaultResponse<{
	accessToken: string;
}>;

// NOTE: User
export type UserProfileResponse = DefaultResponse<Admin>;

// NOTE: Questionnaire Category
export type GetQuestionnaireCategoryResponse = DefaultResponse<{
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
export type GetSurveyCategoryResponse = DefaultResponse<{
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
export type GetTaskCategoryResponse = DefaultResponse<{
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
export type GetQuestionnaireResponse = DefaultResponse<{
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

export type CreateQuestionnaireResponse = DefaultResponse<{}>;

// NOTE: Notification
export type SendNotificationResponse = DefaultResponse<{}>;

// NOTE: Survey
export type GetSurveyResponse = DefaultResponse<{
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

export type CreateSurveyResponse = DefaultResponse<{}>;

// NOTE: Task
export type GetTasksResponse = DefaultResponse<{
	data: {
		id: number;
		image: null;
		name: string;
		slug: string;
		description: string;
		// type: "QUESTIONNAIRE" | "APP";
		reward: number;
		// point: number;
		categoryId: number;
		duration: number;
		createdAt: string;
		updatedAt: string;
	}[];
	pagination: Pagination;
}>;

export type CreateTaskResponse = DefaultResponse<{}>;
