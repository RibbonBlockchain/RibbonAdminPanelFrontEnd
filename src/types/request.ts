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
