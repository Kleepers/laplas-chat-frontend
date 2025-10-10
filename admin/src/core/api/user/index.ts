import { apiClient } from "../config";
import { USER_ENDPOINTS } from "./constants";
import type { UpdateUserRequest, UserInfoResponse } from "./types";

export const userApi = {
	async getUserInfo(): Promise<UserInfoResponse> {
		const response = await apiClient.get<UserInfoResponse>(
			USER_ENDPOINTS.ME_INFO,
		);
		return response.data;
	},

	async updateUser(userData: UpdateUserRequest): Promise<void> {
		await apiClient.put(USER_ENDPOINTS.ME, userData);
	},

	async deleteUser(): Promise<void> {
		await apiClient.delete(USER_ENDPOINTS.ME);
	},
};

export * from "./constants";
export * from "./types";
