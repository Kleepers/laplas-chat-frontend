function parseJwt (token: string) {
	let base64Url = token.split('.')[1];
	let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

/**
 * Проверяет, истек ли срок действия JWT токена
 */
export const isTokenExpired = (token: string): boolean => {
	try {
		// Декодируем payload токена
		const payload = parseJwt(token);
		const currentTime = Math.floor(Date.now() / 1000);

		// Проверяем срок действия (exp - expiration time)
		return payload.exp < currentTime;
	} catch (e) {
		console.error(e)
		// Если токен невалидный, считаем его истекшим
		return true;
	}
};

/**
 * Проверяет, истек ли срок действия текущего токена пользователя
 */
export const isCurrentTokenExpired = (): boolean => {
	// Получаем токен из localStorage напрямую для избежания циркулярных зависимостей
	const storedData = localStorage.getItem("user-storage");
	if (!storedData) return true;

	try {
		const { state } = JSON.parse(storedData);
		const { accessToken } = state;

		if (!accessToken) return true;

		return isTokenExpired(accessToken);
	} catch {
		return true;
	}
};
