import { Link, useLocation } from "@tanstack/react-router";
import { Home, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export const MainSidebar = () => {
	const location = useLocation();
	const { t } = useTranslation();
	const menuItems = [
		{
			title: t("sidebar.dashboard"),
			url: "/dashboard",
			icon: Home,
		},
		{
			title: t("sidebar.users"),
			url: "/users",
			icon: Users,
		},
	];

	return (
		<Sidebar>
			<SidebarHeader className="border-b">
				<h2 className="text-lg font-semibold px-2">Laplas Admin</h2>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>{t("sidebar.mainMenu")}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.url}>
									<SidebarMenuButton
										asChild
										isActive={location.pathname === item.url}
									>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
