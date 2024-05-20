import {
	User,
	Category,
	Pagination,
	Questionnaire,
	RewardPartner,
	Survey,
	Task,
	Notification,
} from ".";

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
export type UserProfileResponse = DefaultResponse<User>;

// NOTE:  Category
export type GetCategoriesResponse = DefaultResponse<{
	data: Category[];
	pagination: Pagination;
}>;
export type GetCategoryByIdResponse = DefaultResponse<Category>;
export type CreateCategoryResponse = DefaultResponse<{}>;

// NOTE: Questionnaire
type QuestionnaireWithTotal = Omit<Questionnaire, "questions"> & {
	totalResponses: number;
	totalQuestions: number;
};
export type GetQuestionnaireResponse = DefaultResponse<{
	data: QuestionnaireWithTotal[];
	pagination: Pagination;
}>;

export type GetQuestionnaireByIdResponse = DefaultResponse<Questionnaire>;

export type CreateQuestionnaireResponse = DefaultResponse<{}>;

// NOTE: Survey

type SurveyWithTotal = Omit<Survey, "questions"> & {
	totalResponses: number;
	totalQuestions: number;
};
export type GetSurveyResponse = DefaultResponse<{
	data: SurveyWithTotal[];
	pagination: Pagination;
}>;

export type GetSurveyByIdResponse = DefaultResponse<Survey>;

export type CreateSurveyResponse = DefaultResponse<{}>;

// NOTE: Task

type TaskWithTotal = Omit<Task, "questions"> & {
	totalResponses: number;
	totalQuestions: number;
};
export type GetTasksResponse = DefaultResponse<{
	data: TaskWithTotal[];
	pagination: Pagination;
}>;

export type GetTaskByIdResponse = DefaultResponse<Task>;

export type CreateTaskResponse = DefaultResponse<{}>;

// NOTE: Notification
export type SendNotificationResponse = DefaultResponse<{}>;

// NOTE: Reward partners
export type GetRewardPartnersResponse = DefaultResponse<{
	data: RewardPartner[];
	totalBalance: number;
	pagination: Pagination;
}>;

// NOTE: Reports

export type DownloadSystemReportResponse = DefaultResponse<{}>;

export type GetAllRewardsReportResponse = DefaultResponse<{
	total: number;
	active: number;
	inactive: number;
	data: {
		id: string;
		name: string;
		active: number;
		inactive: number;
	}[];
}>;
export type GetAllUsersReportResponse = DefaultResponse<{
	total: number;
	active: number;
	inactive: number;
	data: {
		id: string;
		name: string;
		active: number;
		inactive: number;
	}[];
}>;
export type GetAllTaskActivityReportResponse = DefaultResponse<{
	total?: number;
	pending?: number;
	averageCompletionRate?: number;
	data: {
		id: string;
		name: string;
		completed: number;
		pending: number;
	}[];
}>;
export type GetAllSurveyActivityReportResponse = DefaultResponse<{
	total?: number;
	pending?: number;
	averageCompletionRate?: number;
	data: {
		id: string;
		name: string;
		completed: number;
		pending: number;
	}[];
}>;
export type GetAllQuestionnaireActivityReportResponse = DefaultResponse<{
	total?: number;
	pending?: number;
	averageCompletionRate?: number;
	data: {
		id: string;
		name: string;
		completed: number;
		pending: number;
	}[];
}>;

// NOTE: Other

export type GetSummaryResponse = DefaultResponse<{
	count: {
		active: number;
		closed: number;
	};
}>;

export type GetDashboardSummaryResponse = DefaultResponse<{
	task: number;
	survey: number;
	activeUsers: number;
	questionnaire: number;
	inactiveUsers: number;
	completionRate: number;
	totalResponses: number;
	totalActivities: number;
	rewardPoints: number;
}>;

export type GetNotificationHistoryResponse = DefaultResponse<Notification[]>;
