import { z } from "zod";
import { validationMessages } from "@/core/i18n";

export const createOrganizationSchema = z.object({
	name: z
		.string()
		.max(100, { message: validationMessages.organizationNameMaxLength(100) })
		.min(1, { message: validationMessages.organizationNameRequired() }),
	avatar_url: z
		.string()
		.url({ message: validationMessages.invalidUrl() })
		.optional()
		.or(z.literal("")),
});

export type CreateOrganizationFormData = z.infer<
	typeof createOrganizationSchema
>;
