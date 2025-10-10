import {
	showApiErrorToast,
	showToast,
	showTranslatedErrorToast,
	showTranslatedInfoToast,
	showTranslatedSuccessToast,
	showTranslatedWarningToast,
} from "../../core/api";

export const useToast = () => {
	return {
		showToast,
		showTranslatedSuccessToast,
		showTranslatedErrorToast,
		showTranslatedInfoToast,
		showTranslatedWarningToast,
		showApiErrorToast,
	};
};
