import {
	User,
	Category,
	Pagination,
	Questionnaire,
	RewardPartner,
	Survey,
	Task,
	Notification,
	UserActivityByCategory,
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

export type GetRewardPartnerByIdResponse = DefaultResponse<RewardPartner>;

export type GetFundingHistoryResponse = DefaultResponse<{
	data: {
		id: number;
		amount: number;
		points: number;
		metadata: {
			to: "0x004E9b9c6Ff44ccd0c2bD12addB9b9C56E893E62";
			from: "0xe050A5B250919d0c552085DF16f71c1716079821";
			contractAddress: null;
			transactionIndex: 1;
			gasUsed: {
				type: "BigNumber";
				hex: "0x88ae";
			};
			logsBloom: "0x00000000000080000000000000000000000000000800000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000010000000000000000000000000000008000000200000000000000000000000000000000000000000000000000000000000002008000000000000000000000000000000004000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
			blockHash: "0xcb9d0883d0066a302e1831328c2b668fc01ce44780ab56f3129baefab1f8e318";
			transactionHash: "0xe2145b0019e806d765b86baad2e9fb19c4d2729f3e1398ea61f0eab40ff1e74a";
			logs: {
				transactionIndex: 1;
				blockNumber: 13147689;
				transactionHash: "0xe2145b0019e806d765b86baad2e9fb19c4d2729f3e1398ea61f0eab40ff1e74a";
				address: "0x004E9b9c6Ff44ccd0c2bD12addB9b9C56E893E62";
				topics: [
					"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
					"0x000000000000000000000000e050a5b250919d0c552085df16f71c1716079821",
					"0x0000000000000000000000002fb80abc02d1acec5eb0d96f84705d83f9ddf247",
				];
				data: "0x0000000000000000000000000000000000000000000000000000000000002710";
				logIndex: 0;
				blockHash: "0xcb9d0883d0066a302e1831328c2b668fc01ce44780ab56f3129baefab1f8e318";
			}[];
			blockNumber: 13147689;
			confirmations: 3;
			cumulativeGasUsed: {
				type: "BigNumber";
				hex: "0x0133e1";
			};
			effectiveGasPrice: {
				type: "BigNumber";
				hex: "0x5968302f";
			};
			status: 1;
			type: 2;
			byzantium: true;
			events: [
				{
					transactionIndex: 1;
					blockNumber: 13147689;
					transactionHash: "0xe2145b0019e806d765b86baad2e9fb19c4d2729f3e1398ea61f0eab40ff1e74a";
					address: "0x004E9b9c6Ff44ccd0c2bD12addB9b9C56E893E62";
					topics: [
						"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
						"0x000000000000000000000000e050a5b250919d0c552085df16f71c1716079821",
						"0x0000000000000000000000002fb80abc02d1acec5eb0d96f84705d83f9ddf247",
					];
					data: "0x0000000000000000000000000000000000000000000000000000000000002710";
					logIndex: 0;
					blockHash: "0xcb9d0883d0066a302e1831328c2b668fc01ce44780ab56f3129baefab1f8e318";
					args: [
						"0xe050A5B250919d0c552085DF16f71c1716079821",
						"0x2Fb80aBc02D1aCec5eb0D96F84705D83f9Ddf247",
						{
							type: "BigNumber";
							hex: "0x2710";
						},
					];
					event: "Transfer";
					eventSignature: "Transfer(address,address,uint256)";
				},
			];
		};
		userId: number;
		partnerId: number;
		admin: {
			id: number;
			avatar: null;
			firstName: string;
			lastName: string;
			otherNames: string;
			email: string;
			phone: string;
			location: string;
			gender: "MALE" | "FEMALE";
			dob: string;
			socials: {
				x: string;
				discord: string;
				linkedIn: string;
				instagram: string;
			};
			worldId: null;
			partnerId: number;
			role: "SUPER_ADMIN" | "ADMIN";
			status: "ACTIVE" | "INACTIVE";
			numberOfClaims: number;
			lastClaimTime: string;
			createdAt: string;
			updatedAt: string;
		};
		createdAt: string;
		updatedAt: string;
	}[];
	pagination: Pagination;
}>;

export type CreateVaultResponse = DefaultResponse<null>;
export type TransferToVaultResponse = DefaultResponse<null>;

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

// NOTE: Users Report

export type GetUsersActivitiesResponse = DefaultResponse<{
	data: {
		id: number;
		ses: number;
		location: string;
		createdAt: string;
		updatedAt: string;
		totalRewards: number;
		dailyRewards: number;
		totalRatings: number;
		questionnaires: number;
	}[];
	pagination: Pagination;
}>;

export type GetUsersActivitiesQuestionnaireResponse = DefaultResponse<{
	user: {
		id: number;
		location: string;
		ses: number;
		rating: number;
		totalReward: number;
	};
	data: UserActivityByCategory;
}>;

// NOTE: Rating
export type GetRatingOverviewResponse = DefaultResponse<{
	ratingsStatus: {
		ratedActivities: string;
		unratedActivities: string;
		total: number;
	};
	totalAverageRatings: string;
	ratingDistributions: {
		type: number;
		total: number;
		percentage: number;
	}[];
	activitiesRated: {
		activity: string;
		total: number;
		sum: number;
		average: number;
		status: string;
	}[];
	geoDistribution: {
		code: string;
		count: number;
		percentage: string;
	}[];
}>;

// NOTE: Other

export type GetCPIndexResponse = DefaultResponse<
	{
		id: number;
		country: string;
		january: string;
		february: string;
		march: string;
		april: string;
		may: string;
		june: string;
		july: string;
		august: string;
		september: string;
		october: string;
		november: string;
		december: string;
		year: string;
		createdAt: string;
		updatedAt: string;
		averageCPI: string;
		currentCPI: string;
	}[]
>;

export type GetCPIndexUploadHistoryResponse = DefaultResponse<
	{
		id: number;
		fileName: string;
		userId: number;
		user?: User;
		createdAt: string;
	}[]
>;

export type UploadCPIndexResponse = DefaultResponse<{}>;

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
