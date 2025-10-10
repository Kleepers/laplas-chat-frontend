import { apiClient } from "../config";
import type { Organization } from "../user/types";
import { ORGANIZATION_ENDPOINTS } from "./constants";
import type {
	CreateOrganizationRequest,
	InviteMemberRequest,
	OrganizationMember,
	UpdateMemberRoleRequest,
	UpdateOrganizationRequest,
} from "./types";

export const organizationApi = {
	async createOrganization(
		data: CreateOrganizationRequest,
	): Promise<Organization> {
		const response = await apiClient.post<Organization>(
			ORGANIZATION_ENDPOINTS.CREATE,
			data,
		);
		return response.data;
	},

	async updateOrganization(
		orgId: string,
		data: UpdateOrganizationRequest,
	): Promise<Organization> {
		const response = await apiClient.put<Organization>(
			ORGANIZATION_ENDPOINTS.UPDATE(orgId),
			data,
		);
		return response.data;
	},

	async deleteOrganization(orgId: string): Promise<void> {
		await apiClient.delete(ORGANIZATION_ENDPOINTS.DELETE(orgId));
	},

	async getMembers(orgId: string): Promise<OrganizationMember[]> {
		const response = await apiClient.get<OrganizationMember[]>(
			ORGANIZATION_ENDPOINTS.MEMBERS(orgId),
		);
		return response.data;
	},

	async inviteMember(orgId: string, data: InviteMemberRequest): Promise<void> {
		await apiClient.post(ORGANIZATION_ENDPOINTS.INVITE(orgId), data);
	},

	async updateMemberRole(
		orgId: string,
		userId: string,
		data: UpdateMemberRoleRequest,
	): Promise<void> {
		await apiClient.put(
			ORGANIZATION_ENDPOINTS.UPDATE_MEMBER_ROLE(orgId, userId),
			data,
		);
	},

	async deleteMember(orgId: string, userId: string): Promise<void> {
		await apiClient.delete(ORGANIZATION_ENDPOINTS.DELETE_MEMBER(orgId, userId));
	},
};

export * from "./constants";
export * from "./types";
