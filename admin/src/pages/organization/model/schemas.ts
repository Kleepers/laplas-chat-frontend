import { z } from "zod";
import { validationMessages } from "@/core/i18n";

export const organizationSchema = z.object({
	name: z
		.string()
		.min(1, { message: validationMessages.required("Organization name") })
		.max(100, { message: validationMessages.organizationNameMaxLength(100) }),
	avatar_url: z.string().optional().or(z.literal("")),
});

export type OrganizationFormData = z.infer<typeof organizationSchema>;
