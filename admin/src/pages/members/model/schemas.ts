import { z } from "zod";
import { validationMessages } from "@/core/i18n";

export const inviteMemberSchema = z.object({
	user_email: z
		.string()
		.min(1, { message: validationMessages.emailRequired() })
		.email({ message: validationMessages.emailInvalid() })
		.max(255, { message: validationMessages.emailMaxLength(255) }),
	password: z
		.string()
		.min(1, { message: validationMessages.passwordRequired() })
		.min(8, { message: validationMessages.passwordMinLength(8) })
		.max(128, { message: validationMessages.passwordMaxLength(128) }),
	first_name: z
		.string()
		.min(1, { message: validationMessages.firstNameRequired() })
		.max(100, { message: validationMessages.nameMaxLength("First name", 100) }),
	last_name: z
		.string()
		.min(1, { message: validationMessages.lastNameRequired() })
		.max(100, { message: validationMessages.nameMaxLength("Last name", 100) }),
	role: z.enum(["admin", "member"]),
});

export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;
