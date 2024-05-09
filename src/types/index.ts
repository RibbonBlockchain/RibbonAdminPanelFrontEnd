import { AdminRole, AdminStatus } from "./enums";

export type Pagination = {
	pageSize: number;
	endIndex: number;
	totalPages: number;
	startIndex: number;
	currentPage: number;
	hasNextPage: boolean;
	totalDataSize: number;
	hasPreviousPage: boolean;
};

export type Admin = {
	id: number;
	avatar?: null;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	role: AdminRole;
	status: AdminStatus;
	createdAt: string;
	updatedAt: string;
};

export type AdminCustom = Admin & { id: string };
