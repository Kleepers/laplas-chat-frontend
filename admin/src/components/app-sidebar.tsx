import { Link, useLocation } from "@tanstack/react-router";
import { BarChart3, Building2, User, Users } from "lucide-react";
import { type ComponentProps, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/core/sidebar/store/user-store";
import { useUserStore as useAuthStore } from "@/core/user";
import { NavUser } from "./nav-user";
import { NavUserSkeleton } from "./nav-user-skeleton";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	const { t } = useTranslation();
	const {
		user,
		organizations,
		currentOrganization,
		isLoading,
		fetchUserInfo,
		setCurrentOrganization,
	} = useUserStore();
	const { isAuthenticated } = useAuthStore();
	const location = useLocation();

	useEffect(() => {
		const publicPaths = ["/login", "/register"];
		if (
			isAuthenticated &&
			!user &&
			!isLoading &&
			!publicPaths.includes(location.pathname)
		) {
			fetchUserInfo();
		}
	}, [isAuthenticated, user, isLoading, fetchUserInfo, location.pathname]);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher
					teams={organizations}
					currentTeam={currentOrganization}
					onTeamChange={setCurrentOrganization}
					isLoading={isLoading}
				/>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>{t("sidebar.account")}</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link to="/profile">
									<User />
									<span>{t("sidebar.profile")}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>{t("sidebar.administration")}</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link to="/organization">
									<Building2 />
									<span>{t("sidebar.organization")}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link to="/members">
									<Users />
									<span>{t("sidebar.members")}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						{currentOrganization?.id === "f7418460-7c6f-4975-98af-9e282fa74c22" && (
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/analytics">
										<BarChart3 />
										<span>{t("sidebar.analytics")}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				{isLoading ? <NavUserSkeleton /> : <NavUser user={user} />}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
