import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsPage } from "../pages/analytics";

export const Route = createFileRoute("/_main/analytics")({
	component: AnalyticsPage,
});
