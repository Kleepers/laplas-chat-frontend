import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	type CreateOrganizationFormData,
	createOrganizationSchema,
} from "../model/schemas";
import type { CreateOrganizationModalProps } from "../model/type";

export const CreateOrganizationModal = ({
	open,
	onOpenChange,
	onSubmit,
	isCreating = false,
}: CreateOrganizationModalProps) => {
	const { t } = useTranslation();
	const { showTranslatedSuccessToast, showTranslatedErrorToast } = useToast();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<CreateOrganizationFormData>({
		resolver: zodResolver(createOrganizationSchema),
		mode: "onBlur",
		defaultValues: {
			name: "",
			avatar_url: "",
		},
	});

	const handleFormSubmit = async (data: CreateOrganizationFormData) => {
		try {
			await onSubmit({
				name: data.name.trim(),
				avatar_url: data.avatar_url?.trim() || "",
			});

			showTranslatedSuccessToast(
				"organization.organizationCreatedSuccessfully",
			);
			onOpenChange(false);
			reset();
		} catch {
			showTranslatedErrorToast("organization.errorCreatingOrganization");
		}
	};

	const handleCancel = () => {
		onOpenChange(false);
		reset();
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("organization.createOrganization")}</DialogTitle>
					<DialogDescription>
						{t("organization.createOrganizationDescription")}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">{t("organization.organizationName")}</Label>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<Input
										id="name"
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
						<div className="grid gap-2">
							<Label htmlFor="avatar_url">{t("organization.avatarUrl")}</Label>
							<Controller
								name="avatar_url"
								control={control}
								render={({ field }) => (
									<Input
										id="avatar_url"
										type="url"
										placeholder={t("organization.avatarUrlPlaceholder")}
										{...field}
										className={errors.avatar_url ? "border-red-500" : ""}
										aria-invalid={errors.avatar_url ? "true" : "false"}
										aria-describedby={
											errors.avatar_url ? "avatar-error" : undefined
										}
									/>
								)}
							/>
							{errors.avatar_url && (
								<div id="avatar-error" className="text-red-500 text-sm">
									{errors.avatar_url.message}
								</div>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={handleCancel}
							disabled={isCreating}
						>
							{t("common.cancel")}
						</Button>
						<Button type="submit" disabled={!isValid || isCreating}>
							{isCreating
								? t("organization.creating")
								: t("organization.createOrganizationButton")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
