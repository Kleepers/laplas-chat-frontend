import { toast } from "react-toastify";
import i18n from "@/core/i18n";

export type ToastType = "success" | "error" | "info" | "warning";

export type TranslationInterpolation = Record<string, string | number>;

const safeTranslate = (
	key: string,
	interpolation?: TranslationInterpolation,
): string => {
	const translate = i18n.t as (
		key: string,
		options?: TranslationInterpolation,
	) => string;
	return translate(key, interpolation);
};

export type ApiError = {
	response?: {
		status?: number;
		data?: {
			message?: string;
		};
	};
	message?: string;
};

export interface ToastConfig {
	message: string;
	type?: ToastType;
	autoClose?: number;
	position?:
		| "top-right"
		| "top-center"
		| "top-left"
		| "bottom-right"
		| "bottom-center"
		| "bottom-left";
}

export const showToast = ({
	message,
	type = "info",
	autoClose = 5000,
	position = "top-right",
}: ToastConfig) => {
	toast[type](message, {
		position,
		autoClose,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
};

export const showTranslatedSuccessToast = (
	translationKey: string,
	interpolation?: TranslationInterpolation,
	config?: Partial<ToastConfig>,
) => {
	const message = safeTranslate(translationKey, interpolation);
	showToast({ message, type: "success", ...config });
};

export const showTranslatedErrorToast = (
	translationKey: string,
	interpolation?: TranslationInterpolation,
	config?: Partial<ToastConfig>,
) => {
	const message = safeTranslate(translationKey, interpolation);
	showToast({ message, type: "error", ...config });
};

export const showTranslatedInfoToast = (
	translationKey: string,
	interpolation?: TranslationInterpolation,
	config?: Partial<ToastConfig>,
) => {
	const message = safeTranslate(translationKey, interpolation);
	showToast({ message, type: "info", ...config });
};

export const showTranslatedWarningToast = (
	translationKey: string,
	interpolation?: TranslationInterpolation,
	config?: Partial<ToastConfig>,
) => {
	const message = safeTranslate(translationKey, interpolation);
	showToast({ message, type: "warning", ...config });
};

export const showApiErrorToast = (error: ApiError) => {
	if (error.response?.data?.message) {
		showToast({ message: error.response.data.message, type: "error" });
		return;
	}

	if (error.response?.status) {
		let message: string;

		switch (error.response.status) {
			case 400:
				message = safeTranslate("apiErrors.badRequest");
				break;
			case 401:
				message = safeTranslate("apiErrors.unauthorized");
				break;
			case 403:
				message = safeTranslate("apiErrors.forbidden");
				break;
			case 404:
				message = safeTranslate("apiErrors.notFound");
				break;
			case 422:
				message = safeTranslate("apiErrors.validationError");
				break;
			case 500:
				message = safeTranslate("apiErrors.internalServerError");
				break;
			default:
				message = safeTranslate("apiErrors.statusError", {
					status: error.response.status,
				});
		}

		showToast({ message, type: "error" });
		return;
	}

	if (error.message) {
		showToast({ message: error.message, type: "error" });
		return;
	}

	showToast({
		message: safeTranslate("apiErrors.defaultError"),
		type: "error",
	});
};
