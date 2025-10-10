export type RegisterRequest = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
};

// No response body for successful registration (201)
// Success is determined by HTTP status code
export type RegisterResponse = undefined;
