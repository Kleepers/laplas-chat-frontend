export const ORGANIZATION_ENDPOINTS = {
	CREATE: "/api/organizations",
	UPDATE: (orgId: string) => `/api/organizations/${orgId}`,
	DELETE: (orgId: string) => `/api/organizations/${orgId}`,
	MEMBERS: (orgId: string) => `/api/organizations/${orgId}/members`,
	INVITE: (orgId: string) => `/api/organizations/${orgId}/invite`,
	UPDATE_MEMBER_ROLE: (orgId: string, userId: string) =>
		`/api/organizations/${orgId}/members/${userId}`,
	DELETE_MEMBER: (orgId: string, userId: string) =>
		`/api/organizations/${orgId}/members/${userId}`,
} as const;
