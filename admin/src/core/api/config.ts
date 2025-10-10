import axios from "axios";
import { showApiErrorToast, showTranslatedSuccessToast } from "./toast";

// Создаем инстанс axios с базовой конфигурацией
export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "",
	timeout: 10000,
});

// Функция для настройки interceptors (вызывается из user store)
export const setupApiInterceptors = (
	getAccessToken: () => string | null,
	refreshTokens: () => Promise<void>,
	logout: () => void,
) => {
	// Request interceptor для добавления токена авторизации
	apiClient.interceptors.request.use(
		(config) => {
			const accessToken = getAccessToken();
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		(error) => {
			showApiErrorToast(error);
			return Promise.reject(error);
		},
	);

	// Response interceptor для обработки ошибок авторизации и показа toast
	apiClient.interceptors.response.use(
		(response) => {
			// Показываем успешные уведомления для определенных методов
			if (
				response.config.method === "post" ||
				response.config.method === "put" ||
				response.config.method === "delete"
			) {
				// Проверяем, есть ли сообщение об успехе в ответе
				if (response.data?.message) {
					showTranslatedSuccessToast(response.data.message);
				}
			}
			return response;
		},
		async (error) => {
			const originalRequest = error.config;

			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					await refreshTokens();

					// Повторяем оригинальный запрос с новым токеном
					const accessToken = getAccessToken();
					originalRequest.headers.Authorization = `Bearer ${accessToken}`;
					return apiClient(originalRequest);
				} catch (refreshError) {
					// Если обновление токена не удалось, разлогиниваем пользователя
					logout();
					return Promise.reject(refreshError);
				}
			}

			// Показываем toast для всех ошибок (кроме 401, которые обрабатываются выше)
			if (error.response?.status !== 401) {
				showApiErrorToast(error);
			}

			return Promise.reject(error);
		},
	);
};
