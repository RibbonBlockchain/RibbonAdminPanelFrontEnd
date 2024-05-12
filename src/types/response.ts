import { Admin, Category, Pagination, Questionnaire, Survey, Task } from ".";

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

// NOTE:  Category
export type GetCategoriesResponse = DefaultResponse<{
	data: Category[];
	pagination: Pagination;
}>;
export type GetCategoryByIdResponse = DefaultResponse<Category>;
export type CreateCategoryResponse = DefaultResponse<{}>;

// NOTE: Questionnaire
export type GetQuestionnaireResponse = DefaultResponse<{
	data: Omit<Questionnaire, "questions">[];
	pagination: Pagination;
}>;

export type GetQuestionnaireByIdResponse = DefaultResponse<Questionnaire>;

export type CreateQuestionnaireResponse = DefaultResponse<{}>;

// NOTE: Notification
export type SendNotificationResponse = DefaultResponse<{}>;

// NOTE: Survey
export type GetSurveyResponse = DefaultResponse<{
	data: Omit<Survey, "questions">[];
	pagination: Pagination;
}>;

export type GetSurveyByIdResponse = DefaultResponse<Survey>;

export type CreateSurveyResponse = DefaultResponse<{}>;

// NOTE: Task
export type GetTasksResponse = DefaultResponse<{
	data: Omit<Task, "questions">[];
	pagination: Pagination;
}>;

export type GetTaskByIdResponse = DefaultResponse<Task>;

export type CreateTaskResponse = DefaultResponse<{}>;
