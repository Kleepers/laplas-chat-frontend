import { authApi } from "../../../core/api";
import type { RegisterRequest } from "./types";

export const registerRequest = async (data: RegisterRequest): Promise<void> => {
	return authApi.register(data);
};
