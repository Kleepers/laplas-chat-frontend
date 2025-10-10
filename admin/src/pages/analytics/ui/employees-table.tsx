import { AlertTriangle, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Employee } from "../model/constants";

type DecisionTone =
	| "success"
	| "good"
	| "neutral"
	| "warn"
	| "warning"
	| "danger";

type Decision = {
	label: string;
	tone: DecisionTone;
};

type EnrichedEmployee = Employee & {
	decision: Decision;
};

type Thresholds = {
	asiT1: number;
	pliT1: number;
	asiT2: number;
};

function decisionFor(p: Employee, thresholds: Thresholds, t: any): Decision {
	const { asiT1, pliT1, asiT2 } = thresholds; // asiT1=80, pliT1=70, asiT2=60
	if (p.risk)
		return { label: t("analytics.dontReplaceRiskGate"), tone: "warning" };
	if (p.asi >= asiT1 && p.pli < 55)
		return { label: t("analytics.replaceWithAgent"), tone: "danger" };
	if (p.asi >= asiT1 && p.pli >= pliT1)
		return {
			label: t("analytics.agentizationPlusRoleChange"),
			tone: "success",
		};
	if (p.asi >= asiT2 && p.pli >= pliT1)
		return { label: t("analytics.strongRateReduction"), tone: "good" };
	if (p.asi >= asiT2 && p.pli < 55)
		return { label: t("analytics.partialReductionPliTraining"), tone: "warn" };
	return { label: t("analytics.coPilotNoReduction"), tone: "neutral" };
}

function toneToBadge(
	tone: DecisionTone,
): "default" | "secondary" | "destructive" | "outline" {
	switch (tone) {
		case "success":
		case "good":
			return "default";
		case "danger":
			return "destructive";
		case "warning":
		case "warn":
			return "secondary";
		default:
			return "outline";
	}
}

type EmployeesTableProps = {
	filteredEmployees: Employee[];
};

export function EmployeesTable({ filteredEmployees }: EmployeesTableProps) {
	const { t } = useTranslation();
	const thresholds: Thresholds = { asiT1: 80, pliT1: 70, asiT2: 60 };

	const enriched: EnrichedEmployee[] = filteredEmployees.map((e) => ({
		...e,
		decision: decisionFor(e, thresholds, t),
	}));

	return (
		<TooltipProvider>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>{t("analytics.employeesSolutionsList")}</CardTitle>
					<div className="flex items-center gap-2 text-xs text-gray-500">
						<AlertTriangle className="h-4 w-4" />
						{t("analytics.solutionsConsiderRisk")}
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>{t("analytics.employee")}</TableHead>
								<TableHead>{t("analytics.roleDepartment")}</TableHead>
								<TableHead>{t("analytics.tasks")}</TableHead>
								<TableHead>
									<div className="flex items-center gap-1">
										ASI
										<Tooltip>
											<TooltipTrigger>
												<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
											</TooltipTrigger>
											<TooltipContent className="max-w-[250px]">
												<p>{t("analytics.asiTooltip")}</p>
											</TooltipContent>
										</Tooltip>
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-1">
										PLI
										<Tooltip>
											<TooltipTrigger>
												<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
											</TooltipTrigger>
											<TooltipContent className="max-w-[250px]">
												<p>{t("analytics.pliTooltip")}</p>
											</TooltipContent>
										</Tooltip>
									</div>
								</TableHead>
								<TableHead>{t("analytics.solution")}</TableHead>
								<TableHead>{t("analytics.topClusters")}</TableHead>
								<TableHead>Risk</TableHead>
								<TableHead>{t("analytics.actions")}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{enriched.map((e) => (
								<TableRow key={e.id}>
									<TableCell className="font-medium">{e.name}</TableCell>
									<TableCell>
										{e.role}
										<span className="text-gray-400"> · </span>
										{e.unit}
									</TableCell>
									<TableCell>{e.tasks}</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<span>{e.asi}</span>
											<div className="w-18">
												<Progress value={e.asi} />
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<span>{e.pli}</span>
											<div className="w-18">
												<Progress value={e.pli} />
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant={toneToBadge(e.decision.tone)}>
											{e.decision.label}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1">
											{e.clusters.map((c) => (
												<Badge key={c} variant="outline">
													{c}
												</Badge>
											))}
										</div>
									</TableCell>
									<TableCell>
										{e.risk ? <Badge variant="secondary">RiskGate</Badge> : "—"}
									</TableCell>
									<TableCell>
										<div className="flex gap-2">
											<Button variant="outline" size="sm">
												{t("analytics.profile")}
											</Button>
											<Button variant="outline" size="sm">
												{t("analytics.simulation")}
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</TooltipProvider>
	);
}
