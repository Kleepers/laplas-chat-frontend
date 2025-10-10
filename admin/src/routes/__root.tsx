import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ToastContainer } from "../components/ui/toast-container";

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<ToastContainer />
		</>
	),
});
