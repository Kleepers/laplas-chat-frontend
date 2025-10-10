import { zodResolver } from "@hookform/resolvers/zod";
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
import { organizationApi } from "@/core/api";
import { useUserStore } from "@/core/sidebar/store/user-store";
import {
	type OrganizationFormData,
	organizationSchema,
} from "../model/schemas";

export const OrganizationPage = () => {
	const {
		currentOrganization,
		setCurrentOrganization,
		setOrganizations,
		organizations,
		deleteOrganization,
		isDeletingOrganization,
	} = useUserStore();
	const { showTranslatedSuccessToast, showTranslatedErrorToast } = useToast();
	const [isUpdating, setIsUpdating] = useState(false);
	const [copiedOrgId, setCopiedOrgId] = useState(false);
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<OrganizationFormData>({
		resolver: zodResolver(organizationSchema),
		mode: "onBlur",
		values: {
			name: currentOrganization?.name || "",
			avatar_url: currentOrganization?.avatar_url || "",
		},
	});

	const handleCopyOrgId = async () => {
		if (currentOrganization?.id) {
			await navigator.clipboard.writeText(currentOrganization.id);
			setCopiedOrgId(true);
			setTimeout(() => setCopiedOrgId(false), 2000);
		}
	};

	const onSubmit = async (data: OrganizationFormData) => {
		if (!currentOrganization) return;

		setIsUpdating(true);
		try {
			const updatedOrganization = await organizationApi.updateOrganization(
				currentOrganization.id,
				{
					name: data.name,
					avatar_url: data.avatar_url || "",
				},
			);

			// Обновляем текущую организацию
			setCurrentOrganization(updatedOrganization);

			// Обновляем список организаций
			const updatedOrganizations = organizations.map((org) =>
				org.id === updatedOrganization.id ? updatedOrganization : org,
			);
			setOrganizations(updatedOrganizations);

			showTranslatedSuccessToast(
				"organization.organizationUpdatedSuccessfully",
			);
		} catch (_error) {
			showTranslatedErrorToast("organization.errorUpdatingOrganization");
		} finally {
			setIsUpdating(false);
		}
	};

	const handleDeleteOrganization = async () => {
		if (!currentOrganization) return;
		try {
			await deleteOrganization(currentOrganization.id);
			showTranslatedSuccessToast(
				"organization.organizationDeletedSuccessfully",
			);
		} catch (_error) {
			showTranslatedErrorToast("organization.errorDeletingOrganization");
		}
	};

	if (!currentOrganization) {
		return (
			<div className="max-w-4xl space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						{t("organization.organizationSettings")}
					</h1>
					<p className="text-muted-foreground mt-2">
						{t("organization.organizationSettingsDescription")}
					</p>
				</div>
				<Card>
					<CardContent className="p-6">
						<p className="text-muted-foreground">
							{t("organization.noOrganizationFound")}
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="max-w-4xl space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					{t("organization.organizationSettings")}
				</h1>
				<p className="text-muted-foreground mt-2">
					{t("organization.organizationSettingsDescription")}
				</p>
			</div>

			{/* Organization Identification Block */}
			<Card>
				<CardHeader>
					<CardTitle>{t("organization.organizationIdentification")}</CardTitle>
					<CardDescription>
						{t("organization.organizationIdentificationDescription")}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Organization Name */}
						<div className="space-y-2">
							<Label htmlFor="organizationName">
								{t("organization.organizationName")}
							</Label>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<Input
										id="organizationName"
										placeholder={t("organization.organizationNamePlaceholder")}
										{...field}
										className={errors.name ? "border-red-500" : ""}
										aria-invalid={errors.name ? "true" : "false"}
										aria-describedby={errors.name ? "name-error" : undefined}
									/>
								)}
							/>
							{errors.name && (
								<div id="name-error" className="text-red-500 text-sm">
									{errors.name.message}
								</div>
							)}
						</div>

						{/* Organization ID */}
						<div className="space-y-2">
							<Label htmlFor="organizationId">
								{t("organization.organizationId")}
							</Label>
							<div className="flex items-center space-x-2">
								<Input
									id="organizationId"
									value={currentOrganization.id}
									readOnly
									className="font-mono bg-muted"
								/>
								<Button
									type="button"
									variant="outline"
									size="icon"
									onClick={handleCopyOrgId}
									className="flex-shrink-0"
								>
									{copiedOrgId ? (
										<Check className="size-4 text-green-600" />
									) : (
										<Copy className="size-4" />
									)}
								</Button>
							</div>
						</div>

						{/* Save Button */}
						<div className="pt-4">
							<Button type="submit" disabled={!isDirty || isUpdating}>
								{isUpdating ? t("organization.saving") : t("organization.save")}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			{/* Danger Zone Block */}
			<Card className="border-destructive">
				<CardHeader>
					<CardTitle className="text-destructive">
						{t("organization.dangerZone")}
					</CardTitle>
					<CardDescription>
						{t("organization.deleteOrganizationDescription")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div className="mr-12">
							<p className="font-medium">
								{t("organization.deleteOrganization")}
							</p>
							<p className="text-sm text-muted-foreground">
								If you want to permanently delete this organization and all its
								data, you can do so on the right. This will not delete the users
								members of this organization.
							</p>
						</div>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="destructive"
									size="sm"
									disabled={isDeletingOrganization}
								>
									<Trash2 className="size-4 mr-2" />
									{isDeletingOrganization
										? t("organization.deleting")
										: t("organization.deleteOrganization")}
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										{t("organization.areYouAbsolutelySure")}
									</AlertDialogTitle>
									<AlertDialogDescription>
										{t("organization.deleteOrganizationDescription")}
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleDeleteOrganization}
										className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
									>
										{t("organization.deleteOrganization")}
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
