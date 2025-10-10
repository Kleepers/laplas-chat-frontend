import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Check, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/core/sidebar/store/user-store";
import { ChangePasswordModal } from "@/widgets/change-password-modal";
import { type ProfileFormData, profileSchema } from "./profile-schema";
import { ProfileSkeleton } from "./profile-skeleton";

export const ProfilePage = () => {
	const {
		user,
		isLoading,
		isUpdating,
		isDeleting,
		updateUserProfile,
		deleteUserAccount,
		isChangingPassword,
	} = useUserStore();
	const { showTranslatedSuccessToast, showTranslatedErrorToast } = useToast();
	const [copiedUserId, setCopiedUserId] = useState(false);
	const [copiedEmail, setCopiedEmail] = useState(false);
	const { t } = useTranslation();
	const { formState, handleSubmit, control } = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),

		mode: "onBlur",
		values: {
			first_name: user?.first_name || "",
			last_name: user?.last_name || "",
			avatar_url: user?.avatar_url || "",
		},
	});

	const handleCopyUserId = async () => {
		if (user?.id) {
			await navigator.clipboard.writeText(user.id);
			setCopiedUserId(true);
			setTimeout(() => setCopiedUserId(false), 2000);
		}
	};

	const handleCopyEmail = async () => {
		if (user?.email) {
			await navigator.clipboard.writeText(user.email);
			setCopiedEmail(true);
			setTimeout(() => setCopiedEmail(false), 2000);
		}
	};

	const onSubmit = async (data: ProfileFormData) => {
		if (!user) return;

		const profileInfoChanged =
			data.first_name !== (user?.first_name || "") ||
			data.last_name !== (user?.last_name || "") ||
			data.avatar_url !== (user?.avatar_url || "");

		if (profileInfoChanged) {
			try {
				await updateUserProfile({
					first_name: data.first_name || "",
					last_name: data.last_name || "",
					avatar_url: data.avatar_url || "",
				});
				showTranslatedSuccessToast("profile.profileUpdatedSuccessfully");
			} catch (_error) {
				showTranslatedErrorToast("profile.errorUpdatingProfile");
			}
		}
	};

	const isDirty = formState.isDirty;

	const navigate = useNavigate();

	const handleDeleteAccount = async () => {
		try {
			await deleteUserAccount();
			showTranslatedSuccessToast("profile.accountDeletedSuccessfully");
			navigate({ to: "/login" });
		} catch (_error) {
			showTranslatedErrorToast("profile.errorDeletingAccount");
		}
	};

	if (isLoading || !user) {
		return <ProfileSkeleton />;
	}

	return (
		<div className="max-w-4xl space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					{t("profile.accountSettings")}
				</h1>
				<p className="text-muted-foreground mt-2">
					{t("profile.accountSettingsDescription")}
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{t("profile.profile")}</CardTitle>
					<CardDescription>{t("profile.profileDescription")}</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="userId">{t("profile.userId")}</Label>
							<p className="text-sm text-muted-foreground">
								{t("profile.userIdDescription")}
							</p>
							<div className="flex items-center space-x-2">
								<Input
									id="userId"
									value={user.id}
									readOnly
									className="font-mono bg-muted"
								/>
								<Button
									variant="outline"
									size="icon"
									onClick={handleCopyUserId}
									className="flex-shrink-0"
								>
									{copiedUserId ? (
										<Check className="size-4 text-green-600" />
									) : (
										<Copy className="size-4" />
									)}
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">{t("profile.email")}</Label>
							<p className="text-sm text-muted-foreground">
								{t("profile.emailDescription")}
							</p>
							<div className="flex items-center space-x-2">
								<Input
									id="email"
									type="email"
									value={user.email}
									readOnly
									className="bg-muted"
								/>
								<Button
									variant="outline"
									size="icon"
									onClick={handleCopyEmail}
									className="flex-shrink-0"
								>
									{copiedEmail ? (
										<Check className="size-4 text-green-600" />
									) : (
										<Copy className="size-4" />
									)}
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="firstName">{t("profile.firstName")}</Label>
							<Controller
								name="first_name"
								control={control}
								render={({ field, fieldState }) => (
									<>
										<Input
											id="firstName"
											{...field}
											placeholder={t("profile.firstNamePlaceholder")}
										/>
										{fieldState.error && (
											<p className="text-sm text-destructive">
												{fieldState.error.message}
											</p>
										)}
									</>
								)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="lastName">{t("profile.lastName")}</Label>
							<Controller
								name="last_name"
								control={control}
								render={({ field, fieldState }) => (
									<>
										<Input
											id="lastName"
											{...field}
											placeholder={t("profile.lastNamePlaceholder")}
										/>
										{fieldState.error && (
											<p className="text-sm text-destructive">
												{fieldState.error.message}
											</p>
										)}
									</>
								)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="avatarUrl">{t("profile.avatarUrl")}</Label>
							<Controller
								name="avatar_url"
								control={control}
								render={({ field, fieldState }) => (
									<>
										<Input
											id="avatarUrl"
											type="url"
											{...field}
											placeholder={t("profile.avatarUrlPlaceholder")}
										/>
										{fieldState.error && (
											<p className="text-sm text-destructive">
												{fieldState.error.message}
											</p>
										)}
									</>
								)}
							/>
						</div>
						<div className="pt-4">
							<Button
								type="submit"
								disabled={!isDirty || isUpdating || isChangingPassword}
							>
								{isUpdating || isChangingPassword
									? t("profile.saving")
									: t("profile.save")}
							</Button>
						</div>
					</CardContent>
				</form>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("profile.general")}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div>
							<p className="font-medium">{t("profile.password")}</p>
							<p className="text-sm text-muted-foreground">
								{t("profile.passwordDescription")}
							</p>
						</div>
						<ChangePasswordModal />
					</div>
				</CardContent>
			</Card>

			<Card className="border-destructive">
				<CardHeader>
					<CardTitle className="text-destructive">
						{t("profile.dangerZone")}
					</CardTitle>
					<CardDescription>
						{t("profile.accountDeletionDescription")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div>
							<p className="font-medium">{t("profile.deleteAccount")}</p>
							<p className="text-sm text-muted-foreground">
								{t("profile.deleteAccountDescription")}
							</p>
						</div>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive" size="sm" disabled={isDeleting}>
									<Trash2 className="size-4 mr-2" />
									{isDeleting
										? t("profile.deleting")
										: t("profile.deleteAccount")}
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										{t("profile.areYouAbsolutelySure")}
									</AlertDialogTitle>
									<AlertDialogDescription>
										{t("profile.deleteAccountDescription")}
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleDeleteAccount}
										className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
									>
										{t("profile.deleteAccount")}
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
