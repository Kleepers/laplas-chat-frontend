import { useTranslation } from "react-i18next";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => {
	const { t } = useTranslation();
	return (
		<div className="max-w-4xl space-y-6">
			<div>
				<Skeleton className="h-9 w-64 mb-2" />
				<Skeleton className="h-5 w-80" />
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{t("profile.profile")}</CardTitle>
					<CardDescription>{t("profile.profileDescription")}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-4 w-48" />
						<div className="flex items-center space-x-2">
							<Skeleton className="h-10 flex-1" />
							<Skeleton className="h-10 w-10" />
						</div>
					</div>

					<div className="space-y-2">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-4 w-72" />
						<div className="flex items-center space-x-2">
							<Skeleton className="h-10 flex-1" />
							<Skeleton className="h-10 w-10" />
						</div>
					</div>

					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-10 w-full" />
					</div>

					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-10 w-full" />
					</div>

					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-10 w-full" />
					</div>

					<div className="pt-4">
						<Skeleton className="h-10 w-32" />
					</div>
				</CardContent>
			</Card>

			<Card className="border-destructive">
				<CardHeader>
					<CardTitle className="text-destructive">
						{t("profile.dangerZone")}
					</CardTitle>
					<CardDescription>
						{t("profile.accountDeletionDescription")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-5 w-40" />
							<Skeleton className="h-4 w-80" />
						</div>
						<Skeleton className="h-9 w-32" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
