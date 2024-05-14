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
		reward_partners: {
			index: "/reward-partners",
			single: (id: string) => `/reward-partners/${id}`,
		},
		questionnaires: {
			index: "/questionnaires",
			create: "/questionnaires/create",
			edit: {
				index: (id: string) => `/questionnaires/edit/${id}`,
				ses: (id: string) => `/questionnaires/edit/ses/${id}`,
			},
		},
		surveys: {
			index: "/surveys",
			create: "/surveys/create",
			edit: {
				index: (id: string) => `/surveys/edit/${id}`,
				ses: (id: string) => `/surveys/edit/ses/${id}`,
			},
		},
		tasks: {
			index: "/tasks",
			create: "/tasks/create",
			edit: {
				index: (id: string) => `/tasks/edit/${id}`,
				ses: (id: string) => `/tasks/edit/ses/${id}`,
			},
		},
		send_notification: "/send-notification",
	},
};

export default urls;
