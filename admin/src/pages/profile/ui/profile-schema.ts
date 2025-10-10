import { z } from "zod";
import { validationMessages } from "@/core/i18n";

export const profileSchema = z.object({
	first_name: z
		.string()
		.min(1, { message: validationMessages.firstNameRequired() })
		.max(100, { message: validationMessages.nameMaxLength("First name", 100) }),
	last_name: z
		.string()
		.min(1, { message: validationMessages.lastNameRequired() })
		.max(100, { message: validationMessages.nameMaxLength("Last name", 100) }),
	avatar_url: z
		.string()
		.url({ message: validationMessages.invalidUrl() })
		.optional()
		.or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
