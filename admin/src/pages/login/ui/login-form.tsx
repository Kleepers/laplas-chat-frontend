import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
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
import { useUserStore } from "@/core/user";
import { loginRequest } from "../model/api";
import { type LoginFormData, loginSchema } from "../model/schemas";
import type { LoginResponse } from "../model/types";

export const LoginForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { login, setLoading, isLoading } = useUserStore();
	const { showTranslatedSuccessToast, showTranslatedErrorToast } = useToast();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setLoading(true);

		try {
			const response: LoginResponse = await loginRequest(
				data.email,
				data.password,
			);

			const user = {
				id: data.email,
				username: data.email,
				email: data.email,
			};

			login(response.access_token, response.refresh_token, user);
			showTranslatedSuccessToast("auth.loginSuccess");

			navigate({ to: "/" });
		} catch (err) {
			console.error("Login failed:", err);
			showTranslatedErrorToast("auth.loginFailed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("auth.loginTitle")}</CardTitle>
				<CardDescription>{t("auth.loginDescription")}</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-3">
							<Label htmlFor="email">{t("auth.email")}</Label>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Input
										id="email"
										type="email"
										placeholder={t("auth.emailPlaceholder")}
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
						<div className="grid gap-3">
							<Label htmlFor="password">{t("auth.password")}</Label>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<Input
										id="password"
										type="password"
										placeholder={t("auth.passwordPlaceholder")}
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
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? t("auth.loggingIn") : t("auth.loginButton")}
						</Button>
						<div className="text-center text-sm">
							{t("auth.dontHaveAccount")}{" "}
							<Link to="/register" className="underline">
								{t("auth.signUp")}
							</Link>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
