export enum ResponseType {
	SHORT_TEXT = "SHORT_ANSWER",
	LONG_TEXT = "LONG_ANSWER",
	RADIO = "MULTICHOICE",
	MULTISELECT = "MULTISELECT",
	CHECK_BOX = "CHECKBOX",
	ROUND_BOX = "ROUND_BOX",
	BUBBLES = "BUBBLE",
	DATE = "DATE",
	TIME = "TIME",
	BOOLEAN = "BOOLEAN",
}

export enum UserRole {
	SUPER_ADMIN = "SUPER_ADMIN",
	ADMIN = "ADMIN",
	PATIENT = "PATIENT",
}

export enum UserStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
}
