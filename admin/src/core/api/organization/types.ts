// Organization type is exported from user/types.ts

export type UpdateOrganizationRequest = {
	name: string;
	avatar_url: string;
};

export type CreateOrganizationRequest = {
	name: string;
	avatar_url: string;
};

export type OrganizationMember = {
	user_id: string;
	email: string;
	name: string;
	role: "admin" | "member";
	joined_at: string;
};

export type InviteMemberRequest = {
	user_email: string;
	password: string;
	role: "admin" | "member";
	first_name: string;
	last_name: string;
};

export type UpdateMemberRoleRequest = {
	role: "admin" | "member";
};
