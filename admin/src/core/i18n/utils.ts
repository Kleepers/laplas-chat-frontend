import { useTranslation } from "react-i18next";

export const useValidationMessages = () => {
	const { t } = useTranslation();

	return {
		required: (field: string) => t("validation.required", { field }),
		emailInvalid: () => t("validation.emailInvalid"),
		emailRequired: () => t("validation.emailRequired"),
		passwordRequired: () => t("validation.passwordRequired"),
		passwordMinLength: (min: number) =>
			t("validation.passwordMinLength", { min }),
		passwordMaxLength: (max: number) =>
			t("validation.passwordMaxLength", { max }),
		firstNameRequired: () => t("validation.firstNameRequired"),
		lastNameRequired: () => t("validation.lastNameRequired"),
		nameMaxLength: (field: string, max: number) =>
			t("validation.nameMaxLength", { field, max }),
		emailMaxLength: (max: number) => t("validation.emailMaxLength", { max }),
		organizationNameRequired: () => t("validation.organizationNameRequired"),
		organizationNameMinLength: (min: number) =>
			t("validation.organizationNameMinLength", { min }),
		organizationNameMaxLength: (max: number) =>
			t("validation.organizationNameMaxLength", { max }),
		invalidUrl: () => t("validation.invalidUrl"),
	};
};
