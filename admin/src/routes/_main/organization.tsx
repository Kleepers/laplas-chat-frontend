import { createFileRoute } from "@tanstack/react-router";
import { OrganizationPage } from "@/pages/organization";

export const Route = createFileRoute("/_main/organization")({
	component: OrganizationPage,
});
