import { create } from "zustand";
import {
	authApi,
	type ChangePasswordRequest,
	type CreateOrganizationRequest,
	type Organization,
	organizationApi,
	type User,
	userApi,
} from "../../api";
import { useUserStore as useAuthStore } from "../../user";

type UserStore = {
	user: User | null;
	organizations: Organization[];
	currentOrganization: Organization | null;
	isLoading: boolean;
	isUpdating: boolean;
	isDeleting: boolean;
	isCreatingOrganization: boolean;
	isDeletingOrganization: boolean;
	isChangingPassword: boolean;
	error: string | null;
	fetchUserInfo: () => Promise<void>;
	updateUserProfile: (userData: {
		first_name?: string;
		last_name?: string;
		avatar_url?: string;
	}) => Promise<void>;
	deleteUserAccount: () => Promise<void>;
	changePassword: (data: ChangePasswordRequest) => Promise<boolean>;
	createOrganization: (data: CreateOrganizationRequest) => Promise<void>;
	deleteOrganization: (orgId: string) => Promise<void>;
	setUser: (user: User) => void;
	setOrganizations: (organizations: Organization[]) => void;
	setCurrentOrganization: (organization: Organization | null) => void;
	resetChangePasswordState: () => void;
	reset: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	organizations: [],
	currentOrganization: null,
	isLoading: false,
	isUpdating: false,
	isDeleting: false,
	isCreatingOrganization: false,
	isDeletingOrganization: false,
	isChangingPassword: false,
	error: null,

	fetchUserInfo: async () => {
		set({ isLoading: true, error: null });
		try {
			const data = await userApi.getUserInfo();
			const organizations = data.organizations;

			let currentOrganization: Organization | null = null;
			for (const org of organizations) {
				try {
					await organizationApi.getMembers(org.id);
					currentOrganization = org;
					break;
				} catch {
					console.warn(`No access to organization ${org.name} (${org.id})`);
				}
			}

			set({
				user: data.user,
				organizations,
				currentOrganization,
				isLoading: false,
			});
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Unknown error",
				isLoading: false,
			});
		}
	},

	updateUserProfile: async (userData) => {
		set({ isUpdating: true, error: null });
		try {
			await userApi.updateUser(userData);
			// После успешного обновления перезагружаем данные пользователя
			const data = await userApi.getUserInfo();
			set({
				user: data.user,
				isUpdating: false,
			});
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Unknown error",
				isUpdating: false,
			});
		}
	},

	changePassword: async (data) => {
		set({ isChangingPassword: true, error: null });
		try {
			await authApi.changePassword(data);
			set({ isChangingPassword: false });
			return true;
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Unknown error",
				isChangingPassword: false,
			});
			return false;
		}
	},

	deleteUserAccount: async () => {
		set({ isDeleting: true, error: null });
		try {
			await userApi.deleteUser();
			useAuthStore.getState().logout();
			set({
				user: null,
				organizations: [],
				currentOrganization: null,
				isDeleting: false,
			});
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Unknown error",
				isDeleting: false,
			});
		}
	},

	createOrganization: async (data) => {
		set({ isCreatingOrganization: true, error: null });
		try {
			const newOrganization = await organizationApi.createOrganization(data);
			set((state) => {
				const updatedOrganizations = [...state.organizations, newOrganization];
				return {
					organizations: updatedOrganizations,
					currentOrganization: newOrganization, // Устанавливаем новую организацию как текущую
					isCreatingOrganization: false,
				};
			});
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Unknown error",
				isCreatingOrganization: false,
			});
		}
	},

	deleteOrganization: async (orgId) => {
		set({ isDeletingOrganization: true, error: null });
		try {
			await organizationApi.deleteOrganization(orgId);
			set((state) => {
				const updatedOrganizations = state.organizations.filter(
					(org) => org.id !== orgId,
				);
				// Если удаляемая организация была текущей, устанавливаем новую текущую
				const newCurrentOrganization =
					state.currentOrganization?.id === orgId
						? updatedOrganizations.length > 0
							? updatedOrganizations[0]
							: null
						: state.currentOrganization;

				return {
					organizations: updatedOrganizations,
					currentOrganization: newCurrentOrganization,
					isDeletingOrganization: false,
				};
			});
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Unknown error",
				isDeletingOrganization: false,
			});
		}
	},

	setUser: (user) => set({ user }),
	setOrganizations: (organizations) => set({ organizations }),
	setCurrentOrganization: (organization) =>
		set({ currentOrganization: organization }),

	resetChangePasswordState: () =>
		set({ isChangingPassword: false, error: null }),

	reset: () =>
		set({
			user: null,
			organizations: [],
			currentOrganization: null,
			isLoading: false,
			isUpdating: false,
			isDeleting: false,
			isCreatingOrganization: false,
			isDeletingOrganization: false,
			isChangingPassword: false,
			error: null,
		}),
}));
