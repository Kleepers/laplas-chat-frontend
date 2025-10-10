import { createFileRoute, redirect } from "@tanstack/react-router";
import { isCurrentTokenExpired } from "@/core/api/auth/helpers";
import { useUserStore } from "@/core/user/store";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		const userStore = useUserStore.getState();
		const isTokenExpired = isCurrentTokenExpired();

		// Если пользователь не авторизован или токен истёк
		if (!userStore.isAuthenticated || isTokenExpired) {
			throw redirect({
				to: "/login",
			});
		}

		// Если авторизован и токен действителен - редирект на profile
		throw redirect({
			to: "/profile",
		});
	},
	component: Index,
});

function Index() {
	return (
		<div className="p-2">
			<h3>Добро пожаловать в админ панель!</h3>
		</div>
	);
}
