"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { useRouter } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useUserStore as useSidebarUserStore } from "@/core/sidebar/store/user-store";
import { useUserStore } from "@/core/user/store";

export function NavUser({
	user,
}: {
	user: {
		id: string;
		email: string;
		first_name?: string;
		last_name?: string;
		avatar_url?: string;
	} | null;
}) {
	const { isMobile } = useSidebar();
	const router = useRouter();
	const { logout } = useUserStore();
	const { reset: resetSidebarStore } = useSidebarUserStore();

	const handleLogout = () => {
		logout();
		resetSidebarStore();
		// Clear all localStorage data
		localStorage.clear();
		router.navigate({ to: "/login" });
	};

	if (!user) {
		return null;
	}

	const fullName =
		user.first_name && user.last_name
			? `${user.first_name} ${user.last_name}`
			: user.email;

	const initials =
		user.first_name && user.last_name
			? `${user.first_name[0]}${user.last_name[0]}`
			: user.email.substring(0, 2).toUpperCase();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.avatar_url} alt={fullName} />
								<AvatarFallback className="rounded-lg">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{fullName}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<CaretSortIcon className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.avatar_url} alt={fullName} />
									<AvatarFallback className="rounded-lg">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{fullName}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
