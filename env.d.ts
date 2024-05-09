namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_BACKEND_API: string;
		NEXTAUTH_URL: string; // http://localhost:3000
		NEXTAUTH_SECRET: string; // test

		NEXT_PUBLIC_QUESTIONNAIRE_LIMIT: number; // 10
		NEXT_PUBLIC_SURVEY_LIMIT: number; // 100
		NEXT_PUBLIC_TASK_LIMIT: number; // 30
	}
}
