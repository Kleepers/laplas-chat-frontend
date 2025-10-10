import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const MembersTableSkeleton = () => {
	const { t } = useTranslation();
	const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>{t("members.member")}</TableHead>
					<TableHead>{t("members.role")}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{skeletonRows.map((index) => (
					<TableRow key={index}>
						<TableCell>
							<div className="flex items-center">
								<div className="flex-shrink-0 h-10 w-10">
									<Skeleton className="h-10 w-10 rounded-full" />
								</div>
								<div className="ml-4 space-y-2">
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-3 w-48" />
								</div>
							</div>
						</TableCell>
						<TableCell>
							<Skeleton className="h-6 w-20 rounded-full" />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
