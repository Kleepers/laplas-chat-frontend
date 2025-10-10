import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { z } from "zod";
import { useToast } from "@/components/hooks";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/core/sidebar/store/user-store";
import { changePasswordSchema } from "../model/password-schema";

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const ChangePasswordModal = () => {
	const { t } = useTranslation();
	const { changePassword, isChangingPassword, resetChangePasswordState } =
		useUserStore();
	const { showTranslatedSuccessToast, showTranslatedErrorToast } = useToast();
	const [isOpen, setIsOpen] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<ChangePasswordFormData>({
		resolver: zodResolver(changePasswordSchema),
		mode: "onBlur",
	});

	const handleChangePassword = async (data: ChangePasswordFormData) => {
		try {
			const success = await changePassword({
				current_password: data.currentPassword,
				new_password: data.newPassword,
			});

			if (success) {
				showTranslatedSuccessToast("profile.passwordChangedSuccessfully");
				setIsOpen(false);
				reset();
			}
		} catch (_error) {
			showTranslatedErrorToast("profile.errorChangingPassword");
		}
	};

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			reset();
			resetChangePasswordState();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button
					size="sm"
					className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
				>
					{t("profile.setNewPassword")}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("profile.changePassword")}</DialogTitle>
					<DialogDescription>
						{t("profile.changePasswordDescription")}
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(handleChangePassword)}
					className="space-y-4"
				>
					<div className="space-y-2">
						<Label htmlFor="current-password">
							{t("profile.currentPassword")}
						</Label>
						<Controller
							name="currentPassword"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									id="current-password"
									type="password"
									placeholder={t("profile.currentPasswordPlaceholder")}
									aria-label={t("profile.currentPasswordLabel")}
									tabIndex={0}
									className={errors.currentPassword ? "border-red-500" : ""}
								/>
							)}
						/>
						{errors.currentPassword && (
							<p className="text-sm text-red-500">
								{errors.currentPassword.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="new-password">{t("profile.newPassword")}</Label>
						<Controller
							name="newPassword"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									id="new-password"
									type="password"
									placeholder={t("profile.newPasswordPlaceholder")}
									aria-label={t("profile.newPasswordLabel")}
									tabIndex={0}
									className={errors.newPassword ? "border-red-500" : ""}
								/>
							)}
						/>
						{errors.newPassword && (
							<p className="text-sm text-red-500">
								{errors.newPassword.message}
							</p>
						)}
					</div>
					<DialogFooter>
						<Button
							type="submit"
							disabled={isChangingPassword || !isValid}
							aria-label={t("profile.saveChanges")}
							tabIndex={0}
						>
							{isChangingPassword
								? t("profile.savingChanges")
								: t("profile.saveChanges")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
