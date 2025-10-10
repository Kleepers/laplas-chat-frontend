import { z } from "zod";
import { validationMessages } from "@/core/i18n";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: validationMessages.emailRequired() })
		.email({ message: validationMessages.emailInvalid() }),
	password: z
		.string()
		.min(1, { message: validationMessages.passwordRequired() })
		.min(6, { message: validationMessages.passwordMinLength(6) }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
	email: z
		.string()
		.min(1, { message: validationMessages.emailRequired() })
		.email({ message: validationMessages.emailInvalid() }),
	password: z
		.string()
		.min(1, { message: validationMessages.passwordRequired() })
		.min(6, { message: validationMessages.passwordMinLength(6) }),
	first_name: z
		.string()
		.min(2, { message: validationMessages.firstNameRequired() }),
	last_name: z
		.string()
		.min(2, { message: validationMessages.lastNameRequired() }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
