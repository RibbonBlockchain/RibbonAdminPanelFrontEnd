// NOTE: Questionnaire
export type CreateQuestionnaireRequest = {
	reward: number;
	categoryId: number;
	questions: {
		type: string;
		question: string;
		options: {
			point: number;
			value: string;
		}[];
	}[];
};

export type EditQuestionnaireRequest = {
	id: number;
	reward: number;
	categoryId: number;
	questions: {
		id: number | null;
		type: string;
		question: string;
		options: {
			id: number | null;
			point: number;
			value: string;
		}[];
	}[];
};

// NOTE: Survey
export type CreateSurveyRequest = {
	reward: number;
	categoryId: number;
	questions: {
		type: string;
		question: string;
		options: {
			point: number;
			value: string;
		}[];
	}[];
};

export type EditSurveyRequest = {
	id: number;
	reward: number;
	categoryId: number;
	questions: {
		id: number | null;
		type: string;
		question: string;
		options: {
			id: number | null;
			point: number;
			value: string;
		}[];
	}[];
};

// NOTE: Task
export type CreateTaskRequest = {
	reward: number;
	categoryId: number;
	questions: {
		type: string;
		question: string;
		options: {
			point: number;
			value: string;
		}[];
	}[];
};

export type EditTaskRequest = {
	id: number;
	reward: number;
	categoryId: number;
	questions: {
		id: number | null;
		type: string;
		question: string;
		options: {
			id: number | null;
			point: number;
			value: string;
		}[];
	}[];
};

// NOTE: Reward Partner

export type CreateVaultRequest = {
	points: number;
	address: string;
	partnerId?: number;
};

export type TransferToVaultRequest = { amount: number };

// NOTE: Others
export type UpdateSesScoreRequest = { optionId: number; point: number }[];

export type UpdateStatusRequest = {
	id: number;
	status: "ACTIVE" | "CLOSED";
};
