import { createFileRoute } from "@tanstack/react-router";
import { MembersPage } from "../pages/members";

export const Route = createFileRoute("/_main/members")({
	component: MembersPage,
});
