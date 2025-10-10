import i18n from "./config";

// Validation messages for zod schemas (not hooks)
export const validationMessages = {
	required: (field: string) => i18n.t("validation.required", { field }),
	emailInvalid: () => i18n.t("validation.emailInvalid"),
	emailRequired: () => i18n.t("validation.emailRequired"),
	passwordRequired: () => i18n.t("validation.passwordRequired"),
	passwordMinLength: (min: number) =>
		i18n.t("validation.passwordMinLength", { min }),
	passwordMaxLength: (max: number) =>
		i18n.t("validation.passwordMaxLength", { max }),
	firstNameRequired: () => i18n.t("validation.firstNameRequired"),
	lastNameRequired: () => i18n.t("validation.lastNameRequired"),
	nameMaxLength: (field: string, max: number) =>
		i18n.t("validation.nameMaxLength", { field, max }),
	emailMaxLength: (max: number) => i18n.t("validation.emailMaxLength", { max }),
	organizationNameRequired: () => i18n.t("validation.organizationNameRequired"),
	organizationNameMinLength: (min: number) =>
		i18n.t("validation.organizationNameMinLength", { min }),
	organizationNameMaxLength: (max: number) =>
		i18n.t("validation.organizationNameMaxLength", { max }),
	invalidUrl: () => i18n.t("validation.invalidUrl"),
};
