import { CaretSortIcon, PlusIcon } from "@radix-ui/react-icons";
import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import type { Organization } from "@/core/api";
import { useUserStore } from "@/core/sidebar/store/user-store";
import { CreateOrganizationModal } from "@/widgets/create-organization-modal";

// Компонент для аватара организации
const OrgAvatar = ({
	org,
	className,
}: {
	org: { name: string; avatar_url?: string };
	className: string;
}) => {
	if (org.avatar_url) {
		return <img src={org.avatar_url} alt={org.name} className={className} />;
	}

	// Заглушка для "No Organization"
	if (org.name === "No Organization") {
		return (
			<div
				className={`${className} bg-muted flex items-center flex-shrink-0 justify-center text-muted-foreground font-semibold text-sm`}
			>
				?
			</div>
		);
	}

	// Обычная заглушка для организаций без аватара - показываем первую букву названия
	const firstLetter = org.name.charAt(0).toUpperCase();
	return (
		<div
			className={`${className} bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-semibold text-sm`}
		>
			{firstLetter}
		</div>
	);
};

export function TeamSwitcher({
	teams,
	currentTeam,
	onTeamChange,
	isLoading,
}: {
	teams: Organization[];
	currentTeam: Organization | null;
	onTeamChange: (team: Organization) => void;
	isLoading?: boolean;
}) {
	const { isMobile } = useSidebar();
	const { createOrganization, isCreatingOrganization } = useUserStore();
	const [showCreateModal, setShowCreateModal] = React.useState(false);

	// Если загружается, показываем скелетон
	if (isLoading) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" className="pointer-events-none">
						<div className="size-8 rounded-lg bg-sidebar-accent animate-pulse" />
						<div className="grid flex-1 text-left text-sm leading-tight gap-1">
							<div className="h-4 bg-sidebar-accent rounded animate-pulse" />
							<div className="h-3 bg-sidebar-accent rounded w-3/4 animate-pulse" />
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	// Создаем объект заглушки для организации
	const placeholderOrg: Organization = {
		id: "placeholder",
		name: "No Organization",
		avatar_url: "",
		stripe_customer_id: "",
		subscription_status: "Create one to get started",
		created_at: "",
		updated_at: "",
	};

	const displayTeam = currentTeam || placeholderOrg;

	const handleCreateOrganization = async (data: {
		name: string;
		avatar_url: string;
	}) => {
		await createOrganization(data);
	};

	return (
		<>
			<CreateOrganizationModal
				open={showCreateModal}
				onOpenChange={setShowCreateModal}
				onSubmit={handleCreateOrganization}
				isCreating={isCreatingOrganization}
			/>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<OrgAvatar org={displayTeam} className="size-8 rounded-lg" />
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{displayTeam.name}
									</span>
									<span className="truncate text-xs">
										{displayTeam.subscription_status || "Free"}
									</span>
								</div>
								<CaretSortIcon className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							align="start"
							side={isMobile ? "bottom" : "right"}
							sideOffset={4}
						>
							{teams.length > 0 && (
								<>
									<DropdownMenuLabel className="text-muted-foreground text-xs">
										Organizations
									</DropdownMenuLabel>
									{teams.map((team, index) => (
										<DropdownMenuItem
											key={team.id}
											onClick={() => onTeamChange(team)}
											className="gap-2 p-2"
										>
											<div className="flex size-6 items-center justify-center rounded-md border overflow-hidden">
												<OrgAvatar org={team} className="size-6 rounded-md" />
											</div>
											{team.name}
											<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
										</DropdownMenuItem>
									))}
								</>
							)}
							{teams.length > 0 && <DropdownMenuSeparator />}
							<DropdownMenuItem
								className="gap-2 p-2"
								onClick={() => setShowCreateModal(true)}
							>
								<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
									<PlusIcon className="size-4" />
								</div>
								<div className="font-medium">Create an organization</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</>
	);
}
