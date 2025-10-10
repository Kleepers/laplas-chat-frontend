import type { CreateOrganizationRequest } from "@/core/api";

export type CreateOrganizationModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: CreateOrganizationRequest) => Promise<void>;
	isCreating?: boolean;
};
