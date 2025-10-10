import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Employee } from "../model/constants";
import { AnalyticsSolutionsChart } from "./analytics-solutions-chart";
import { EmployeesTable } from "./employees-table";
import { SkillsRadarChart } from "./skills-radar-chart";

type AnalyticsMainProps = {
	filteredEmployees: Employee[];
};

export function AnalyticsMain({ filteredEmployees }: AnalyticsMainProps) {
	const { t } = useTranslation();

	return (
		<div className="mt-9">
			<div className="rounded-2xl p-4 border border-gray-200 bg-white">
				<Tabs defaultValue="dashboard" className="w-full">
					<TabsList className="grid grid-cols-2" style={{ width: "300px" }}>
						<TabsTrigger value="dashboard">
							{t("analytics.dashboard", "Дашборд")}
						</TabsTrigger>
						<TabsTrigger value="employees">
							{t("analytics.employees", "Сотрудники")}
						</TabsTrigger>
					</TabsList>
					<TabsContent value="dashboard" className="mt-6">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="flex items-center">
									<span className="text-2xl font-bold">
										{t("analytics.solutionsDistribution")}
									</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<AnalyticsSolutionsChart
									filteredEmployees={filteredEmployees}
								/>
							</CardContent>
						</Card>

						<Card className="w-full mt-6">
							<CardHeader>
								<CardTitle>
									<span className="text-2xl font-bold">
										{t("analytics.skillsRadarTitle")}
									</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<SkillsRadarChart filteredEmployees={filteredEmployees} />
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="employees" className="mt-6">
						<EmployeesTable filteredEmployees={filteredEmployees} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
