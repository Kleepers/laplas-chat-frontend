import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { isCurrentTokenExpired } from "@/core/api/auth/helpers";
import { useUserStore } from "@/core/user/store";

export const Route = createFileRoute("/_main")({
	beforeLoad: () => {
		const userStore = useUserStore.getState();
		const isTokenExpired = isCurrentTokenExpired();

		if (!userStore.isAuthenticated || isTokenExpired) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: MainLayout,
});

function MainLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 items-center gap-2 border-b px-6">
					<SidebarTrigger />
					<div className="flex-1">
						<h1 className="text-xl font-semibold">Laplas Admin</h1>
					</div>
				</header>
				<main className="flex-1 p-6">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
