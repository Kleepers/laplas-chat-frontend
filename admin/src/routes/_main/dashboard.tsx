import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/dashboard")({
	component: () => <div>Dashboard Page</div>,
});
