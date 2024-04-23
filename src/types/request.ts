export type CreateQuestionnaireRequest = {
	data: {
		categoryId: number;
		type: string;
		question: string;
		options: {
			point: number;
			value: string;
		}[];
	}[];
};
