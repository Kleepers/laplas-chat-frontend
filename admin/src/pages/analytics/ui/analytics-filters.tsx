import {
	Bot,
	CheckCircle,
	Filter,
	Info,
	LineChart,
	Search,
	Settings,
	Shield,
	Users,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { demoEmployees, type Employee } from "../model/constants";

type FilterProps = {
	search: string;
	setSearch: (value: string) => void;
	unit: string;
	setUnit: (value: string) => void;
	role: string;
	setRole: (value: string) => void;
	noRiskOnly: boolean;
	setNoRiskOnly: (value: boolean) => void;
	filteredEmployees: Employee[];
};

export function AnalyticsFilters({
	search,
	setSearch,
	unit,
	setUnit,
	role,
	setRole,
	noRiskOnly,
	setNoRiskOnly,
	filteredEmployees,
}: FilterProps) {
	const { t } = useTranslation();

	// Get unique departments and roles from demo data
	const units = useMemo(() => {
		const uniqueUnits = [...new Set(demoEmployees.map((e) => e.unit))];
		return ["all", ...uniqueUnits.sort()];
	}, []);

	const roles = useMemo(() => {
		const uniqueRoles = [...new Set(demoEmployees.map((e) => e.role))];
		return ["all", ...uniqueRoles.sort()];
	}, []);

	// Calculate metrics from filtered data
	const metrics = useMemo(() => {
		const employeeCount = filteredEmployees.length;
		const avgAsi =
			employeeCount > 0
				? Math.round(
						filteredEmployees.reduce((sum, emp) => sum + emp.asi, 0) /
							employeeCount,
					)
				: 0;
		const avgPli =
			employeeCount > 0
				? Math.round(
						filteredEmployees.reduce((sum, emp) => sum + emp.pli, 0) /
							employeeCount,
					)
				: 0;
		const riskEmployees = filteredEmployees.filter((emp) => emp.risk).length;
		const riskPercent =
			employeeCount > 0 ? Math.round((riskEmployees / employeeCount) * 100) : 0;
		const highAsiEmployees = filteredEmployees.filter(
			(emp) => emp.asi >= 70,
		).length;
		const autoTaskCoverage =
			employeeCount > 0
				? Math.round((highAsiEmployees / employeeCount) * 100)
				: 0;

		return {
			employeeCount,
			avgAsi,
			avgPli,
			riskPercent,
			autoTaskCoverage,
		};
	}, [filteredEmployees]);

	return (
		<TooltipProvider>
			<div className="rounded-2xl p-4 border border-gray-200 bg-white">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<div className="flex max-w-3xl flex-col gap-3">
							<h1 className="text-3xl font-bold text-gray-900 leading-tight">
								{t("analytics.title")}
							</h1>
							<p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
								{t("analytics.subtitle")}
							</p>
						</div>
						<div className="flex items-center gap-2 ml-auto">
							<Button variant="secondary" className="h-9">
								<Settings className="w-4 h-4" />
								{t("analytics.settings")}
							</Button>
							<Button variant="secondary" className="h-9">
								<Settings className="w-4 h-4" />
								{t("analytics.exportToCsv")}
							</Button>
						</div>
					</div>
				</div>

				<div className="mt-10">
					<div className="flex items-center gap-2 w-full">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
							<Input
								type="text"
								placeholder={t("analytics.searchPlaceholder")}
								className="pl-9"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						<Button variant="outline" size="icon" className="shrink-0">
							<Filter className="w-4 h-4" />
						</Button>
						<Select value={unit} onValueChange={setUnit}>
							<SelectTrigger className="flex-1">
								<SelectValue placeholder={t("analytics.allDepartments")} />
							</SelectTrigger>
							<SelectContent>
								{units.map((u) => (
									<SelectItem key={u} value={u}>
										{u === "all" ? t("analytics.allDepartments") : u}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={role} onValueChange={setRole}>
							<SelectTrigger className="flex-1">
								<SelectValue placeholder={t("analytics.allRoles")} />
							</SelectTrigger>
							<SelectContent>
								{roles.map((r) => (
									<SelectItem key={r} value={r}>
										{r === "all" ? t("analytics.allRoles") : r}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							value={noRiskOnly ? "true" : "false"}
							onValueChange={(v) => setNoRiskOnly(v === "true")}
						>
							<SelectTrigger className="flex-1">
								<SelectValue
									placeholder={t("analytics.allIncludingRiskGate")}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="false">
									{t("analytics.allIncludingRiskGate")}
								</SelectItem>
								<SelectItem value="true">Только без RiskGate</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="mt-10">
					{/* Для экранов < 1500px: 2 ряда - первый ряд 2 карточки, второй ряд 3 карточки */}
					<div className="2xl:hidden">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-1">
										<LineChart className="w-5 h-5" />
										{t("analytics.averageAsi")}
									</CardTitle>
									<CardAction>
										<Tooltip>
											<TooltipTrigger>
												<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
											</TooltipTrigger>
											<TooltipContent className="max-w-[250px]">
												<p>{t("analytics.asiTooltip")}</p>
											</TooltipContent>
										</Tooltip>
									</CardAction>
								</CardHeader>
								<CardContent className="flex flex-col gap-2">
									<div className="text-3xl font-bold">{metrics.avgAsi}</div>
									<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
										<div
											className="h-full bg-black rounded-full"
											style={{ width: `${metrics.avgAsi}%` }}
										/>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-1">
										<Bot className="w-5 h-5" />
										{t("analytics.averagePli")}
									</CardTitle>
									<CardAction>
										<Tooltip>
											<TooltipTrigger>
												<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
											</TooltipTrigger>
											<TooltipContent className="max-w-[250px]">
												<p>{t("analytics.pliTooltip")}</p>
											</TooltipContent>
										</Tooltip>
									</CardAction>
								</CardHeader>
								<CardContent className="flex flex-col gap-2">
									<div className="text-3xl font-bold">{metrics.avgPli}</div>
									<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
										<div
											className="h-full bg-black rounded-full"
											style={{ width: `${metrics.avgPli}%` }}
										/>
									</div>
								</CardContent>
							</Card>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-1">
										<Users className="w-5 h-5" />
										{t("analytics.employeesInSample")}
									</CardTitle>
									<CardAction>
										<Tooltip>
											<TooltipTrigger>
												<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
											</TooltipTrigger>
											<TooltipContent className="max-w-[250px]">
												<p>
													Количество сотрудников в текущей выборке после
													применения фильтров.
												</p>
											</TooltipContent>
										</Tooltip>
									</CardAction>
								</CardHeader>
								<CardContent className="flex flex-col gap-2">
									<div className="text-3xl font-bold">
										{metrics.employeeCount}
									</div>
									<div className="text-sm text-muted-foreground">
										{t("analytics.afterFilters")}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-1">
										<CheckCircle className="w-5 h-5" />
										{t("analytics.autoTaskCoverage")}
									</CardTitle>
									<CardAction>
										<Tooltip>
											<TooltipTrigger>
												<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
											</TooltipTrigger>
											<TooltipContent className="max-w-[250px]">
												<p>{t("analytics.autoCoverageTooltip")}</p>
											</TooltipContent>
										</Tooltip>
									</CardAction>
								</CardHeader>
								<CardContent className="flex flex-col gap-2">
									<div className="text-3xl font-bold">
										{metrics.autoTaskCoverage}%
									</div>
									<div className="text-sm text-muted-foreground">
										{t("analytics.taskShareWithHighAsi")}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-1">
										<Shield className="w-5 h-5" />
										{t("analytics.riskGate")}
									</CardTitle>
									<CardAction>
										<Tooltip>
											<TooltipTrigger>
												<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
											</TooltipTrigger>
											<TooltipContent className="max-w-[250px]">
												<p>{t("analytics.riskGateTooltip")}</p>
											</TooltipContent>
										</Tooltip>
									</CardAction>
								</CardHeader>
								<CardContent className="flex flex-col gap-2">
									<div className="text-3xl font-bold">
										{metrics.riskPercent}%
									</div>
									<div className="text-sm text-muted-foreground">
										{t("analytics.employeesUnderRestrictions")}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Для экранов >= 1500px: все 5 карточек в один ряд */}
					<div className="hidden 2xl:flex 2xl:gap-4">
						<Card className="flex-1">
							<CardHeader>
								<CardTitle className="flex items-center gap-1">
									<LineChart className="w-5 h-5" />
									{t("analytics.averageAsi")}
								</CardTitle>
								<CardAction>
									<Tooltip>
										<TooltipTrigger>
											<Info className="w-4 h-4 opacity-50" />
										</TooltipTrigger>
										<TooltipContent className="max-w-[250px]">
											<p>{t("analytics.asiTooltip")}</p>
										</TooltipContent>
									</Tooltip>
								</CardAction>
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<div className="text-3xl font-bold">{metrics.avgAsi}</div>
								<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
									<div
										className="h-full bg-black rounded-full"
										style={{ width: `${metrics.avgAsi}%` }}
									/>
								</div>
							</CardContent>
						</Card>
						<Card className="flex-1">
							<CardHeader>
								<CardTitle className="flex items-center gap-1">
									<Bot className="w-5 h-5" />
									{t("analytics.averagePli")}
								</CardTitle>
								<CardAction>
									<Tooltip>
										<TooltipTrigger>
											<Info className="w-4 h-4 opacity-50" />
										</TooltipTrigger>
										<TooltipContent className="max-w-[250px]">
											<p>{t("analytics.pliTooltip")}</p>
										</TooltipContent>
									</Tooltip>
								</CardAction>
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<div className="text-3xl font-bold">{metrics.avgPli}</div>
								<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
									<div
										className="h-full bg-black rounded-full"
										style={{ width: `${metrics.avgPli}%` }}
									/>
								</div>
							</CardContent>
						</Card>
						<Card className="flex-1">
							<CardHeader>
								<CardTitle className="flex items-center gap-1">
									<Users className="w-5 h-5" />
									{t("analytics.employeesInSample")}
								</CardTitle>
								<CardAction>
									<Tooltip>
										<TooltipTrigger>
											<Info className="w-4 h-4 opacity-50" />
										</TooltipTrigger>
										<TooltipContent className="max-w-[250px]">
											<p>
												Количество сотрудников в текущей выборке после
												применения фильтров.
											</p>
										</TooltipContent>
									</Tooltip>
								</CardAction>
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<div className="text-3xl font-bold">
									{metrics.employeeCount}
								</div>
								<div className="text-sm text-muted-foreground">
									{t("analytics.afterFilters")}
								</div>
							</CardContent>
						</Card>
						<Card className="flex-1">
							<CardHeader>
								<CardTitle className="flex items-center gap-1">
									<CheckCircle className="w-5 h-5" />
									{t("analytics.autoTaskCoverage")}
								</CardTitle>
								<CardAction>
									<Tooltip>
										<TooltipTrigger>
											<Info className="w-4 h-4 opacity-50" />
										</TooltipTrigger>
										<TooltipContent className="max-w-[250px]">
											<p>{t("analytics.autoCoverageTooltip")}</p>
										</TooltipContent>
									</Tooltip>
								</CardAction>
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<div className="text-3xl font-bold">
									{metrics.autoTaskCoverage}%
								</div>
								<div className="text-sm text-muted-foreground">
									{t("analytics.taskShareWithHighAsi")}
								</div>
							</CardContent>
						</Card>
						<Card className="flex-1">
							<CardHeader>
								<CardTitle className="flex items-center gap-1">
									<Shield className="w-5 h-5" />
									{t("analytics.riskGate")}
								</CardTitle>
								<CardAction>
									<Tooltip>
										<TooltipTrigger>
											<Info className="w-4 h-4 opacity-50" />
										</TooltipTrigger>
										<TooltipContent className="max-w-[250px]">
											<p>{t("analytics.riskGateTooltip")}</p>
										</TooltipContent>
									</Tooltip>
								</CardAction>
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<div className="text-3xl font-bold">{metrics.riskPercent}%</div>
								<div className="text-sm text-muted-foreground">
									{t("analytics.employeesUnderRestrictions")}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}
