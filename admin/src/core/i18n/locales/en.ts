export const en = {
	// Common UI elements
	common: {
		cancel: "Cancel",
		save: "Save",
		delete: "Delete",
		edit: "Edit",
		create: "Create",
		loading: "Loading...",
		submit: "Submit",
		close: "Close",
		confirm: "Confirm",
		back: "Back",
		next: "Next",
		finish: "Finish",
		yes: "Yes",
		no: "No",
	},

	// Authentication
	auth: {
		// Login
		loginTitle: "Login to your account",
		loginDescription: "Enter your email and password to login",
		email: "Email",
		password: "Password",
		emailPlaceholder: "Enter your email",
		passwordPlaceholder: "Enter your password",
		loginButton: "Login",
		loggingIn: "Logging in...",
		dontHaveAccount: "Don't have an account?",
		signUp: "Sign up",

		// Register
		createAccountTitle: "Create an account",
		createAccountDescription: "Enter your information to create your account",
		firstName: "First Name",
		lastName: "Last Name",
		firstNamePlaceholder: "John",
		lastNamePlaceholder: "Doe",
		emailPlaceholderRegister: "john@example.com",
		createPasswordPlaceholder: "Create a password",
		createAccountButton: "Create account",
		creatingAccount: "Creating account...",
		alreadyHaveAccount: "Already have an account?",
		signIn: "Sign in",

		// Email verification
		checkEmailTitle: "Check your email",
		checkEmailDescription:
			"We've sent you a confirmation email. Please click the link in the email to confirm your account.",

		// Success messages
		accountCreatedSuccess:
			"Account created successfully! Please check your email for confirmation.",
		loginSuccess: "Login successful",

		// Error messages
		loginFailed: "Login failed. Please check your credentials.",
		registrationFailed: "Registration failed. Please try again.",
	},

	// Profile
	profile: {
		title: "Profile",
		editProfile: "Edit Profile",
		personalInformation: "Personal Information",
		accountSettings: "Account Settings",
		accountSettingsDescription:
			"Manage your account settings and personal information.",
		profile: "Profile",
		profileDescription: "Update your personal information and profile details.",
		userId: "User ID",
		userIdDescription: "This is your unique user identifier.",
		email: "Email",
		emailDescription: "Your email address cannot be changed.",
		firstName: "First Name",
		firstNamePlaceholder: "Enter your first name",
		lastName: "Last Name",
		lastNamePlaceholder: "Enter your last name",
		avatarUrl: "Avatar URL",
		avatarUrlPlaceholder: "Enter avatar image URL",
		saving: "Saving...",
		save: "Save Changes",
		general: "General",
		password: "Password",
		passwordDescription: "Change your account password.",
		dangerZone: "Danger Zone",
		accountDeletionDescription:
			"Permanently delete your account and all associated data.",
		deleteAccount: "Delete Account",
		deleteAccountDescription:
			"This action cannot be undone. This will permanently delete your account and all your data.",
		deleting: "Deleting...",
		areYouAbsolutelySure: "Are you absolutely sure?",
		changePassword: "Change password",
		setNewPassword: "Set new password",
		changePasswordDescription: "Set a new password for your account.",
		currentPassword: "Current",
		newPassword: "New",
		currentPasswordPlaceholder: "Your current password",
		newPasswordPlaceholder: "Your new password",
		currentPasswordLabel: "Current password",
		newPasswordLabel: "New password",
		saveChanges: "Save changes",
		savingChanges: "Saving changes...",
		profileUpdatedSuccessfully: "Profile updated successfully",
		errorUpdatingProfile: "Error updating profile",
		passwordChangedSuccessfully: "Password changed successfully",
		errorChangingPassword: "Error changing password",
		accountDeletedSuccessfully: "Account deleted successfully",
		errorDeletingAccount: "Error deleting account",
	},

	// Organization
	organization: {
		createOrganization: "Create organization",
		createOrganizationDescription:
			"Create a new organization to manage your team and projects.",
		organizationName: "Organization name",
		organizationNamePlaceholder: "Enter organization name",
		avatarUrl: "Avatar URL (optional)",
		avatarUrlPlaceholder: "Enter avatar image URL",
		creating: "Creating...",
		createOrganizationButton: "Create organization",
		organizationSettings: "Organization Settings",
		organizationSettingsDescription:
			"Manage your organization settings and configuration.",
		noOrganizationFound: "No organization found.",
		organizationIdentification: "Organization Identification",
		organizationIdentificationDescription:
			"Update your organization name and identification details.",
		organizationId: "Organization ID",
		saving: "Saving...",
		save: "Save Changes",
		dangerZone: "Danger Zone",
		deleteOrganization: "Delete Organization",
		deleteOrganizationDescription:
			"This action cannot be undone. This will permanently delete the organization and all its data.",
		deleting: "Deleting...",
		areYouAbsolutelySure: "Are you absolutely sure?",
		organizationCreatedSuccessfully: "Organization created successfully",
		errorCreatingOrganization: "Error creating organization",
		organizationUpdatedSuccessfully: "Organization updated successfully",
		errorUpdatingOrganization: "Error updating organization",
		organizationDeletedSuccessfully: "Organization deleted successfully",
		errorDeletingOrganization: "Error deleting organization",
	},

	// Members
	members: {
		title: "Members",
		members: "Members",
		membersDescription: "Manage your organization members and their roles.",
		inviteMember: "Invite Member",
		inviteMemberDescription: "Invite a new member to your organization",
		inviteMemberButton: "Invite Member",
		editRole: "Edit Role",
		editMemberRole: "Edit Member Role",
		editMemberRoleDescription: "Change the role for {{name}}.",
		deleteMember: "Delete Member",
		deleteMemberDescription:
			"Are you sure you want to remove {{name}} from this organization? This action cannot be undone.",
		deleting: "Deleting...",
		role: "Role",
		selectRole: "Select role",
		admin: "Admin",
		member: "Member",
		actions: "Actions",
		email: "Email",
		password: "Password",
		firstName: "First Name",
		lastName: "Last Name",
		inviting: "Inviting...",
		saving: "Saving...",
		saveChanges: "Save Changes",
		memberInvitedSuccessfully: "Member invited successfully",
		errorInvitingMember: "Error inviting member",
		memberRoleUpdatedSuccessfully: "Member role updated successfully",
		errorUpdatingMemberRole: "Error updating member role",
		memberDeletedSuccessfully: "Member deleted successfully",
		errorDeletingMember: "Error deleting member",
		noOrganizationSelected: "No organization selected",
		errorLoadingMembers: "Error loading members",
		errorReloadingMembers: "Error reloading members",
		noOrganizationAvailable: "No Organization Available",
		noOrganizationDescription:
			"Please create or select an organization to manage members.",
	},

	// Theme Settings
	theme: {
		title: "Theme Settings",
		description:
			"Paste your custom CSS theme variables to apply a new color scheme. Use CSS format with :root and .dark selectors.",
		themeMode: "Theme Mode",
		themeModeDescription: "Switch between light and dark mode",
		switchToLight: "Switch to Light",
		switchToDark: "Switch to Dark",
		cssThemeVariables: "CSS Theme Variables",
		apply: "Apply",
		reset: "Reset",
	},

	// Validation messages
	validation: {
		required: "{{field}} is required",
		emailInvalid: "Please enter a valid email address",
		emailRequired: "Email is required",
		passwordRequired: "Password is required",
		passwordMinLength: "Password must be at least {{min}} characters long",
		passwordMaxLength: "Password must be less than {{max}} characters",
		firstNameRequired: "First name is required",
		lastNameRequired: "Last name is required",
		nameMaxLength: "{{field}} must be less than {{max}} characters",
		emailMaxLength: "Email must be less than {{max}} characters",
		organizationNameRequired: "Organization name is required",
		organizationNameMinLength:
			"Organization name must be at least {{min}} characters long",
		organizationNameMaxLength:
			"Organization name must be less than {{max}} characters",
		invalidUrl: "Please enter a valid URL",
	},

	// Toast messages
	toast: {
		success: "Success",
		error: "Error",
		warning: "Warning",
		info: "Info",
	},

	// API Error messages
	apiErrors: {
		defaultError: "An error occurred while processing the request",
		badRequest: "Bad request",
		unauthorized: "Authorization required",
		forbidden: "Access denied",
		notFound: "Resource not found",
		validationError: "Data validation error",
		internalServerError: "Internal server error",
		statusError: "Error {{status}}",
	},

	nav: {
		dashboard: "Dashboard",
		users: "Users",
		organization: "Organization",
		profile: "Profile",
		settings: "Settings",
		logout: "Logout",
	},

	// Sidebar
	sidebar: {
		mainMenu: "Main Menu",
		dashboard: "Dashboard",
		users: "Users",
		settings: "Settings",
		account: "Account",
		profile: "Profile",
		administration: "Administration",
		organization: "Organization",
		members: "Members",
		analytics: "Analytics",
	},

	// Analytics
	analytics: {
		title: "Substitution Analytics: ASI × PLI",
		subtitle:
			"Solutions: replacement / reduction / co-pilot based on task automability (ASI) and AI literacy (PLI) with RiskGate consideration.",
		settings: "Settings",
		exportToCsv: "Export to CSV",
		searchPlaceholder: "Search",
		allDepartments: "All Departments",
		allRoles: "All Roles",
		allIncludingRiskGate: "All (including RiskGate)",
		averageAsi: "Average ASI",
		averagePli: "Average PLI",
		employeesInSample: "Employees in Sample",
		afterFilters: "After Filters",
		autoTaskCoverage: "Auto-task Coverage",
		taskShareWithHighAsi: "Share of tasks with ASI ≥ 80",
		riskGate: "RiskGate",
		employeesUnderRestrictions: "Share of employees under restrictions",
		dashboard: "Dashboard",
		employees: "Employees",
		// Employees table
		employeesSolutionsList: "Employees — Solutions List",
		solutionsConsiderRisk:
			"Solutions consider RiskGate, COL, and JUDG at role level.",
		employee: "Employee",
		roleDepartment: "Role / Department",
		tasks: "Tasks",
		solution: "Solution",
		topClusters: "Top Clusters",
		actions: "Actions",
		profile: "Profile",
		simulation: "Simulation",
		// Decisions
		dontReplaceRiskGate: "Don't Replace (RiskGate)",
		replaceWithAgent: "Replace with Agent",
		agentizationPlusRoleChange: "Agentization + Role Change",
		strongRateReduction: "Strong Rate Reduction",
		partialReductionPliTraining: "Partial Reduction + PLI Training",
		coPilotNoReduction: "Co-pilot, No Reduction",
		// Thresholds
		adjustThresholds: "Adjust thresholds to recalculate solutions:",
		asiFullAgentizationThreshold: "ASI Full Agentization Threshold",
		asiPartialThreshold: "ASI Partial Threshold",
		pliHighThreshold: "High PLI Threshold",
		// Tooltips
		asiTooltip:
			"Automation Suitability Index — task automation capability: repeatability, structure, agent suitability, shadow run quality (LLM-FIT).",
		pliTooltip:
			"Prompt Literacy Index — AI proficiency: session length and efficiency (SLR), prompt structure (PRL), template reuse (TPL), proper tools (PIT), examples/tests (EPR), guardrail compliance (GCS).",
		autoCoverageTooltip:
			"Share of tasks in sample where ASI ≥ full agentization threshold.",
		riskGateTooltip:
			"Share of employees/tasks requiring HITL/compliance: PII, legal signatures, high financial risks.",
		// Skills
		skillsRadarTitle: "AI Skills Radar (Average)",
		slrTooltip:
			"Session Length Ratio — steps and minutes to result, normalized by task class. Green zone ≈ 1-3 iterations, ≤12 minutes.",
		prlTooltip:
			"Prompt Readability & Structure — presence/completeness of sections: Goal→Context→Constraints→Criteria→Format→Examples.",
		tplTooltip:
			"Template Leverage — share of tasks starting from approved templates and quality of their adaptation.",
		pitTooltip:
			"Pro Tooling Index — appropriateness of RAG/CRM/SQL/validator calls vs 'chatting' with LLM.",
		eprTooltip:
			"Example-Priming Rate — presence of short examples/counter-examples and mini-tests beforehand.",
		gcsTooltip:
			"Guardrail Compliance Score — PII placeholders, no leaks, correct roles/permissions and secure mode.",
		// Chart titles
		solutionsDistribution: "Solutions Distribution",
	},
} as const;
