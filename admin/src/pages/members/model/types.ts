export type Member = {
	user_id: string;
	email: string;
	name: string;
	role: "admin" | "member";
	joined_at: string;
};
