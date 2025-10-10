import type { OrganizationMember } from "../../../core/api";
import { organizationApi } from "../../../core/api";

export async function fetchOrganizationMembers(
	orgId: string,
): Promise<OrganizationMember[]> {
	return organizationApi.getMembers(orgId);
}
