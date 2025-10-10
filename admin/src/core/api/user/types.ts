export type User = {
	id: string;
	email: string;
	first_name?: string;
	last_name?: string;
	avatar_url?: string;
	created_at: string;
	updated_at: string;
};

export type Organization = {
	id: string;
	name: string;
	avatar_url: string;
	stripe_customer_id: string;
	subscription_status: string;
	created_at: string;
	updated_at: string;
};

export type UserInfoResponse = {
	user: User;
	organizations: Organization[];
};

export type UpdateUserRequest = {
	first_name?: string;
	last_name?: string;
	avatar_url?: string;
};
