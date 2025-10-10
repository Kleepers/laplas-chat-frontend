export type ChangePasswordFormProps = {
	formData: {
		current_password: string;
		new_password: string;
	};
	handleInputChange: (field: string, value: string) => void;
	passwordError: string | null;
	localPasswordError: string | null;
};
