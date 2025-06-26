export const SERVER_ERRORS =
	'Oops! Something went wrong. Please try again later, or contact support if the issue persists.'

export const requireField = (field: string) =>
	`${field} is required. Please provide a valid ${field}.`
export const stringField = (field: string) =>
	`${field} must be a string. Please provide a valid ${field}.`
export const emailField = (field: string) =>
	`${field} must be a valid email. Please provide a valid ${field}.`
export const passwordField = (field: string) =>
	`${field} must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.`
