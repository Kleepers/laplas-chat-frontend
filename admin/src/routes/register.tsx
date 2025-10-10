import { createFileRoute, redirect } from "@tanstack/react-router";
import { isCurrentTokenExpired } from "@/core/api/auth/helpers";
import { useUserStore } from "@/core/user/store";
import { RegisterPage } from "@/pages/register";

export const Route = createFileRoute("/register")({
	beforeLoad: () => {
		const userStore = useUserStore.getState();
		const isTokenExpired = isCurrentTokenExpired();

		// Если пользователь авторизован и токен действителен - редирект на главную
		if (userStore.isAuthenticated && !isTokenExpired) {
			throw redirect({
				to: "/",
			});
		}
	},
	component: RegisterPage,
});
