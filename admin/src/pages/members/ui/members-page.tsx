import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/hooks";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/core/sidebar/store/user-store";
import type { OrganizationMember } from "../../../core/api";
import { fetchOrganizationMembers } from "../model/api";
import { InviteMemberModal } from "./invite-member-modal";
import { MembersTable } from "./members-table";
import { MembersTableSkeleton } from "./members-table-skeleton";

export const MembersPage = () => {
	const [members, setMembers] = useState<OrganizationMember[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
	const { currentOrganization } = useUserStore();
	const { showTranslatedErrorToast } = useToast();
	const { t } = useTranslation();
	useEffect(() => {
		const loadMembers = async () => {
			if (!currentOrganization?.id) {
				setError(t("members.noOrganizationSelected"));
				setLoading(false);
				return;
			}

			try {
				const data = await fetchOrganizationMembers(currentOrganization.id);
				setMembers(data);
				setError(null);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : t("members.errorLoadingMembers"),
				);
				showTranslatedErrorToast("members.errorLoadingMembers");
			} finally {
				setLoading(false);
			}
		};

		loadMembers();
	}, [currentOrganization, showTranslatedErrorToast, t]);

	const handleInviteSuccess = () => {
		const reloadMembers = async () => {
			if (!currentOrganization?.id) return;

			try {
				const data = await fetchOrganizationMembers(currentOrganization.id);
				setMembers(data);
			} catch (_err) {
				showTranslatedErrorToast("members.errorReloadingMembers");
			}
		};

		reloadMembers();
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						{t("members.members")}
					</h1>
					<p className="text-muted-foreground mt-2">
						{t("members.membersDescription")}
					</p>
				</div>
				<Button
					onClick={() => setIsInviteModalOpen(true)}
					disabled={!currentOrganization}
				>
					<Plus className="size-4 mr-2" />
					{t("members.inviteMember")}
				</Button>
			</div>

			{/* Members Table */}
			{loading ? (
				<MembersTableSkeleton />
			) : error ? (
				<div className="text-center text-red-500">{error}</div>
			) : !currentOrganization ? (
				<div className="text-center text-muted-foreground py-8">
					<p className="text-lg font-medium">
						{t("members.noOrganizationAvailable")}
					</p>
					<p className="text-sm mt-2">
						{t("members.noOrganizationDescription")}
					</p>
				</div>
			) : (
				<MembersTable
					members={members}
					organizationId={currentOrganization.id}
					onMemberUpdated={handleInviteSuccess}
				/>
			)}

			{currentOrganization && (
				<InviteMemberModal
					open={isInviteModalOpen}
					onOpenChange={setIsInviteModalOpen}
					organizationId={currentOrganization.id}
					onSuccess={handleInviteSuccess}
				/>
			)}
		</div>
	);
};
