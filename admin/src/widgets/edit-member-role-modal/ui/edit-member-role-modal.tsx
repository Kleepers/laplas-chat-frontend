import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/hooks";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type OrganizationMember, organizationApi } from "@/core/api";

type EditMemberRoleModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	organizationId: string;
	member: OrganizationMember;
	onSuccess: () => void;
};

export const EditMemberRoleModal = ({
	open,
	onOpenChange,
	organizationId,
	member,
	onSuccess,
}: EditMemberRoleModalProps) => {
	const { showTranslatedSuccessToast, showTranslatedErrorToast } = useToast();
	const [selectedRole, setSelectedRole] = useState<"admin" | "member">(
		member.role,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { t } = useTranslation();
	const handleSubmit = async () => {
		if (selectedRole === member.role) {
			onOpenChange(false);
			return;
		}

		setIsSubmitting(true);

		try {
			await organizationApi.updateMemberRole(organizationId, member.user_id, {
				role: selectedRole,
			});
			showTranslatedSuccessToast("members.memberRoleUpdatedSuccessfully");
			onSuccess();
			onOpenChange(false);
		} catch {
			showTranslatedErrorToast("members.errorUpdatingMemberRole");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleOpenChange = (newOpen: boolean) => {
		if (!newOpen) {
			setSelectedRole(member.role);
		}
		onOpenChange(newOpen);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("members.editMemberRole")}</DialogTitle>
					<DialogDescription>
						{t("members.editMemberRoleDescription", { name: member.name })}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="role">{t("members.role")}</Label>
						<Select
							value={selectedRole}
							onValueChange={(value: "admin" | "member") =>
								setSelectedRole(value)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder={t("members.selectRole")} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="member">{t("members.member")}</SelectItem>
								<SelectItem value="admin">{t("members.admin")}</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button
						onClick={handleSubmit}
						disabled={isSubmitting || selectedRole === member.role}
					>
						{isSubmitting ? t("members.saving") : t("members.saveChanges")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
