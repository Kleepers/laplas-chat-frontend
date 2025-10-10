import type { Resources } from "./config";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "common";
		resources: Resources["en"];
	}
}
