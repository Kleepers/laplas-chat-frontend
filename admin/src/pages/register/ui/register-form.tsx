import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/hooks";
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
import {
	type RegisterFormData,
	registerSchema,
} from "../../login/model/schemas";
import { registerRequest } from "../model/api";
import type { RegisterRequest } from "../model/types";

export const RegisterForm = () => {
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const { showTranslatedSuccessToast, showTranslatedErrorToast } = useToast();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError: setFormError,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
			first_name: "",
			last_name: "",
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		setIsLoading(true);
		setSuccess(false);

		try {
			const registerData: RegisterRequest = {
				email: data.email,
				password: data.password,
				first_name: data.first_name,
				last_name: data.last_name,
			};

			await registerRequest(registerData);
			showTranslatedSuccessToast("auth.accountCreatedSuccess");
			setSuccess(true);
		} catch {
			showTranslatedErrorToast("auth.registrationFailed");
			setFormError("root", {
				type: "manual",
				message: t("auth.registrationFailed"),
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (success) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>{t("auth.checkEmailTitle")}</CardTitle>
					<CardDescription>{t("auth.checkEmailDescription")}</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("auth.createAccountTitle")}</CardTitle>
				<CardDescription>{t("auth.createAccountDescription")}</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-4 items-start">
							<div className="grid gap-2">
								<Label htmlFor="first_name">{t("auth.firstName")}</Label>
								<Controller
									name="first_name"
									control={control}
									render={({ field }) => (
										<Input
											id="first_name"
											type="text"
											placeholder={t("auth.firstNamePlaceholder")}
											{...field}
											className={errors.first_name ? "border-red-500" : ""}
											aria-invalid={errors.first_name ? "true" : "false"}
											aria-describedby={
												errors.first_name ? "first_name-error" : undefined
											}
										/>
									)}
								/>
								<div id="first_name-error" className="text-red-500 text-sm">
									{errors.first_name?.message}
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last_name">{t("auth.lastName")}</Label>
								<Controller
									name="last_name"
									control={control}
									render={({ field }) => (
										<Input
											id="last_name"
											type="text"
											placeholder={t("auth.lastNamePlaceholder")}
											{...field}
											className={errors.last_name ? "border-red-500" : ""}
											aria-invalid={errors.last_name ? "true" : "false"}
											aria-describedby={
												errors.last_name ? "last_name-error" : undefined
											}
										/>
									)}
								/>
								<div id="last_name-error" className="text-red-500 text-sm">
									{errors.last_name?.message}
								</div>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">{t("auth.email")}</Label>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Input
										id="email"
										type="email"
										placeholder={t("auth.emailPlaceholderRegister")}
										{...field}
										className={errors.email ? "border-red-500" : ""}
										aria-invalid={errors.email ? "true" : "false"}
										aria-describedby={errors.email ? "email-error" : undefined}
									/>
								)}
							/>
							<div id="email-error" className="text-red-500 text-sm">
								{errors.email?.message}
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">{t("auth.password")}</Label>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<Input
										id="password"
										type="password"
										placeholder={t("auth.createPasswordPlaceholder")}
										{...field}
										className={errors.password ? "border-red-500" : ""}
										aria-invalid={errors.password ? "true" : "false"}
										aria-describedby={
											errors.password ? "password-error" : undefined
										}
									/>
								)}
							/>
							<div id="password-error" className="text-red-500 text-sm">
								{errors.password?.message}
							</div>
						</div>
						{errors.root && (
							<div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
								{errors.root.message}
							</div>
						)}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading
								? t("auth.creatingAccount")
								: t("auth.createAccountButton")}
						</Button>
						<div className="text-center text-sm">
							{t("auth.alreadyHaveAccount")}{" "}
							<Link to="/login" className="underline">
								{t("auth.signIn")}
							</Link>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
