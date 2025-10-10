import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/users")({
	component: () => <div>Users Page</div>,
});
