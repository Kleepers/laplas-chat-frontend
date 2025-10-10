import { z } from "zod";
import { validationMessages } from "@/core/i18n";

export const changePasswordSchema = z.object({
	currentPassword: z
		.string()
		.min(1, { message: validationMessages.passwordRequired() }),
	newPassword: z
		.string()
		.min(6, { message: validationMessages.passwordMinLength(6) })
		.max(128, { message: validationMessages.passwordMaxLength(128) }),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
