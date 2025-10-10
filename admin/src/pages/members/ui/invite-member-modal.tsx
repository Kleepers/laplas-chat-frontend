import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { organizationApi } from "@/core/api";
import {
	type InviteMemberFormData,
	inviteMemberSchema,
} from "../model/schemas";

type InviteMemberModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	organizationId: string;
	onSuccess: () => void;
};

export const InviteMemberModal = ({
	open,
	onOpenChange,
	organizationId,
	onSuccess,
}: InviteMemberModalProps) => {
	const { showTranslatedSuccessToast, showTranslatedErrorToast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<InviteMemberFormData>({
		resolver: zodResolver(inviteMemberSchema),
		mode: "onBlur",
		defaultValues: {
			user_email: "",
			password: "",
			role: "member",
			first_name: "",
			last_name: "",
		},
	});

	const onSubmit = async (data: InviteMemberFormData) => {
		setIsSubmitting(true);

		try {
			await organizationApi.inviteMember(organizationId, data);
			showTranslatedSuccessToast("members.memberInvitedSuccessfully");
			onSuccess();
			onOpenChange(false);
			reset();
		} catch (_err) {
			showTranslatedErrorToast("members.errorInvitingMember");
		} finally {
			setIsSubmitting(false);
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
					<DialogTitle>{t("members.inviteMember")}</DialogTitle>
					<DialogDescription>
						{t("members.inviteMemberDescription")}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-start gap-4">
							<Label htmlFor="email" className="text-right">
								{t("members.email")}
							</Label>
							<Controller
								name="user_email"
								control={control}
								render={({ field }) => (
									<div className="col-span-3">
										<Input
											id="email"
											type="email"
											{...field}
											className={errors.user_email ? "border-destructive" : ""}
										/>
										{errors.user_email && (
											<p className="text-destructive text-sm mt-1">
												{errors.user_email.message}
											</p>
										)}
									</div>
								)}
							/>
						</div>

						<div className="grid grid-cols-4 items-start gap-4">
							<Label htmlFor="password" className="text-right">
								{t("members.password")}
							</Label>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<div className="col-span-3">
										<Input
											id="password"
											type="password"
											{...field}
											className={errors.password ? "border-destructive" : ""}
										/>
										{errors.password && (
											<p className="text-destructive text-sm mt-1">
												{errors.password.message}
											</p>
										)}
									</div>
								)}
							/>
						</div>

						<div className="grid grid-cols-4 items-start gap-4">
							<Label htmlFor="first_name" className="text-right">
								{t("members.firstName")}
							</Label>
							<Controller
								name="first_name"
								control={control}
								render={({ field }) => (
									<div className="col-span-3">
										<Input
											id="first_name"
											{...field}
											className={errors.first_name ? "border-destructive" : ""}
										/>
										{errors.first_name && (
											<p className="text-destructive text-sm mt-1">
												{errors.first_name.message}
											</p>
										)}
									</div>
								)}
							/>
						</div>

						<div className="grid grid-cols-4 items-start gap-4">
							<Label htmlFor="last_name" className="text-right">
								{t("members.lastName")}
							</Label>
							<Controller
								name="last_name"
								control={control}
								render={({ field }) => (
									<div className="col-span-3">
										<Input
											id="last_name"
											{...field}
											className={errors.last_name ? "border-destructive" : ""}
										/>
										{errors.last_name && (
											<p className="text-destructive text-sm mt-1">
												{errors.last_name.message}
											</p>
										)}
									</div>
								)}
							/>
						</div>

						<div className="grid grid-cols-4 items-start gap-4">
							<Label htmlFor="role" className="text-right">
								{t("members.role")}
							</Label>
							<Controller
								name="role"
								control={control}
								render={({ field }) => (
									<div className="col-span-3">
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className={errors.role ? "border-destructive" : ""}
											>
												<SelectValue placeholder={t("members.selectRole")} />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="member">
													{t("members.member")}
												</SelectItem>
												<SelectItem value="admin">
													{t("members.admin")}
												</SelectItem>
											</SelectContent>
										</Select>
										{errors.role && (
											<p className="text-destructive text-sm mt-1">
												{t("members.editRole")}
											</p>
										)}
									</div>
								)}
							/>
						</div>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={handleCancel}
							disabled={isSubmitting}
						>
							{t("common.cancel")}
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting
								? t("members.inviting")
								: t("members.inviteMemberButton")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
