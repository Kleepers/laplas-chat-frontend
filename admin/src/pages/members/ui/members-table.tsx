import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteMemberModal } from "@/widgets/delete-member-modal";
import { EditMemberRoleModal } from "@/widgets/edit-member-role-modal";
import { Button } from "../../../components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../components/ui/table";
import type { OrganizationMember } from "../../../core/api";

type MembersTableProps = {
	members: OrganizationMember[];
	organizationId: string;
	onMemberUpdated: () => void;
};

export const MembersTable = ({
	members,
	organizationId,
	onMemberUpdated,
}: MembersTableProps) => {
	const [editingMember, setEditingMember] = useState<OrganizationMember | null>(
		null,
	);
	const [deletingMember, setDeletingMember] =
		useState<OrganizationMember | null>(null);

	const handleEditMember = (member: OrganizationMember) => {
		setEditingMember(member);
	};

	const handleDeleteMember = (member: OrganizationMember) => {
		setDeletingMember(member);
	};

	const handleEditSuccess = () => {
		onMemberUpdated();
		setEditingMember(null);
	};

	const handleDeleteSuccess = () => {
		onMemberUpdated();
		setDeletingMember(null);
	};

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Member</TableHead>
						<TableHead>Role</TableHead>
						<TableHead className="w-[100px]">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{members.map((member) => (
						<TableRow key={member.user_id} className="group">
							<TableCell>
								<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10">
										<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
											<span className="text-muted-foreground font-medium">
												{member.name.charAt(0).toUpperCase()}
											</span>
										</div>
									</div>
									<div className="ml-4">
										<div className="text-sm font-medium">{member.name}</div>
										<div className="text-sm text-muted-foreground">
											{member.email}
										</div>
									</div>
								</div>
							</TableCell>
							<TableCell>
								<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-muted text-muted-foreground capitalize">
									{member.role}
								</span>
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleEditMember(member)}
										className="h-8 w-8 p-0"
									>
										<Edit className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleDeleteMember(member)}
										className="h-8 w-8 p-0 text-destructive hover:text-destructive"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{editingMember && (
				<EditMemberRoleModal
					open={!!editingMember}
					onOpenChange={(open) => !open && setEditingMember(null)}
					organizationId={organizationId}
					member={editingMember}
					onSuccess={handleEditSuccess}
				/>
			)}

			{deletingMember && (
				<DeleteMemberModal
					open={!!deletingMember}
					onOpenChange={(open) => !open && setDeletingMember(null)}
					organizationId={organizationId}
					member={deletingMember}
					onSuccess={handleDeleteSuccess}
				/>
			)}
		</>
	);
};
