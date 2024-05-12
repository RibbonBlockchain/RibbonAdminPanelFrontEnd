import { AdminRole, AdminStatus, ResponseType } from "./enums";

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

export type Category = {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	createdAt: string;
	updatedAt: string;
};

export type Option = {
	id: number;
	text: string;
	point: number;

	updatedAt: string;
	createdAt: string;
};

export type Question = {
	id: number;
	text: string;
	type: ResponseType;
	isFirst: boolean;
	isLast: boolean;

	options?: Option[];
	updatedAt?: string;
	createdAt?: string;
};

// NOTE: Questionnaire
type QuestionnaireOption = Option & {
	questionId: number;
};

type QuestionnaireQuestion = Question & {
	taskId: number;
	options?: QuestionnaireOption[];
};

export type Questionnaire = {
	id: number;
	image: null;
	name: string;
	slug: string;
	description: string;
	type: "QUESTIONNAIRE" | "APP";
	point: number;
	duration: number;
	status: "ACTIVE" | "CLOSED";
	reward: number;
	createdAt: string;
	updatedAt: string;
	categoryId?: number; // TODO: should be provided by backend but currently not
	questions?: QuestionnaireQuestion[];
};

// NOTE: Survey
export type SurveyOption = Option & {
	surveyId: number;
};

export type SurveyQuestion = Question & {
	options?: SurveyOption[];
};

export type Survey = {
	id: number;
	image: null;
	name: string;
	slug: string;
	description: string;
	reward: number;
	categoryId: number;
	duration: number;
	// type: "QUESTIONNAIRE" | "APP";
	// point: number;
	// status: "ACTIVE" | "CLOSED";
	createdAt: string;
	updatedAt: string;
	questions?: SurveyQuestion[];
};

// NOTE: Task

export type TaskOption = Option & {};

export type TaskQuestion = Question & {
	taskId: number;
	options?: TaskOption[];
};

export type Task = {
	id: number;
	image: null;
	name: string;
	slug: string;
	description: string;
	reward: number;
	categoryId: number;
	duration: number;
	// type: "QUESTIONNAIRE" | "APP";
	// point: number;
	// status: "ACTIVE" | "CLOSED";
	createdAt: string;
	updatedAt: string;
	questions?: TaskQuestion[];
};
