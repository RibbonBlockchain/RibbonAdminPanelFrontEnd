const urls = {
	auth: {
		login: (query?: string) => `/login${query ? `?${query}` : ""}`,
		forgot_password: (query?: string) =>
			`/forgot-password${query ? `?${query}` : ""}`,
		reset_password: (query?: string) =>
			`/reset-password${query ? `?${query}` : ""}`,
	},
	dashboard: {
		home: "/",
		reward_points: "/reward-points",
		questionnaires: {
			index: "/questionnaires",
			create: "/questionnaires/create",
		},
		surveys: "/surveys",
		tasks: "/tasks",
	},
};

export default urls;
