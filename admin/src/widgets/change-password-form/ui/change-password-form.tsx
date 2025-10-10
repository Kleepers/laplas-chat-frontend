import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ChangePasswordFormProps } from "../model/type";

export const ChangePasswordForm = ({
	formData,
	handleInputChange,
	passwordError,
	localPasswordError,
}: ChangePasswordFormProps) => {
	const { t } = useTranslation();
	return (
		<div className="space-y-4 border-t pt-6">
			<div>
				<p className="font-medium">{t("profile.password")}</p>
				<p className="text-sm text-muted-foreground">
					{t("profile.passwordDescription")}
				</p>
			</div>
			<div className="space-y-2">
				<Label htmlFor="current-password">{t("profile.currentPassword")}</Label>
				<Input
					id="current-password"
					type="password"
					value={formData.current_password}
					onChange={(e) =>
						handleInputChange("current_password", e.target.value)
					}
					placeholder={t("profile.currentPasswordPlaceholder")}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="new-password">{t("profile.newPassword")}</Label>
				<Input
					id="new-password"
					type="password"
					value={formData.new_password}
					onChange={(e) => handleInputChange("new_password", e.target.value)}
					placeholder={t("profile.newPasswordPlaceholder")}
				/>
			</div>
			{(passwordError || localPasswordError) && (
				<p className="text-sm text-destructive">
					{localPasswordError || passwordError}
				</p>
			)}
		</div>
	);
};
