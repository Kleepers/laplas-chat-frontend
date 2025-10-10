import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/hooks";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type OrganizationMember, organizationApi } from "@/core/api";

type DeleteMemberModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	organizationId: string;
	member: OrganizationMember;
	onSuccess: () => void;
};

export const DeleteMemberModal = ({
	open,
	onOpenChange,
	organizationId,
	member,
	onSuccess,
}: DeleteMemberModalProps) => {
	const { showTranslatedSuccessToast, showTranslatedErrorToast } = useToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const { t } = useTranslation();
	const handleDelete = async () => {
		setIsDeleting(true);

		try {
			await organizationApi.deleteMember(organizationId, member.user_id);
			showTranslatedSuccessToast("members.memberDeletedSuccessfully");
			onSuccess();
			onOpenChange(false);
		} catch (_err) {
			showTranslatedErrorToast("members.errorDeletingMember");
		} finally {
			setIsDeleting(false);
		}
	};

	const handleOpenChange = (newOpen: boolean) => {
		if (!newOpen) {
		}
		onOpenChange(newOpen);
	};

	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{t("members.deleteMember")}</AlertDialogTitle>
					<AlertDialogDescription>
						{t("members.deleteMemberDescription", { name: member.name })}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>
						{t("common.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={isDeleting}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isDeleting ? t("members.deleting") : t("members.deleteMember")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
