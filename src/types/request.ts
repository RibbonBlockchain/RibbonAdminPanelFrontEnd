export type CreateQuestionnaireRequest = {
	data: {
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
};
