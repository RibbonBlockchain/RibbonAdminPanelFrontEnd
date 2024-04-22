"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API;

export const client = axios.create({ baseURL });

// client.interceptors.request.use((config) => {
// 	// @ts-ignore
// 	const token = window !== undefined ? session?.apiToken : null;
// 	config.headers.Authorization = `Bearer ${token}`;
// 	return config;
// });

// client.interceptors.response.use(
// 	(res) => {
// 		return res;
// 	},
// 	(error) => {
// 		if (error.response.status === 401)
// 			return window.location.replace(urls.auth.login());

// 		throw error;
// 		// location.reload();
// 	}
// );
