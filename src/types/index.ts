import { AdminRole, AdminStatus } from "./enums";

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
