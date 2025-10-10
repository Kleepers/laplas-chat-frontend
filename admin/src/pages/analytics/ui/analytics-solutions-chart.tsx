"use client";

import { Info } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip as RTooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Employee } from "../model/constants";

type ChartProps = {
	filteredEmployees: Employee[];
};

// Decision logic function
function decisionFor(
	p: Employee,
	thresholds: { asiT1: number; asiT2: number; pliT1: number },
	t: any,
) {
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

export function AnalyticsSolutionsChart({ filteredEmployees }: ChartProps) {
	const { t } = useTranslation();
	// Thresholds state
	const [asiT1, setAsiT1] = useState(80); // порог полной агентизации
	const [asiT2, setAsiT2] = useState(60); // порог частичной
	const [pliT1, setPliT1] = useState(70); // высокий PLI

	const thresholds = { asiT1, asiT2, pliT1 };

	// Обогащаем данные решениями
	const enriched = filteredEmployees.map((e) => ({
		...e,
		decision: decisionFor(e, thresholds, t),
	}));

	// Подсчитываем количество по каждому решению
	const decisionCounts = useMemo(() => {
		const map = new Map();
		enriched.forEach((e) => {
			const key = e.decision.label;
			map.set(key, (map.get(key) || 0) + 1);
		});
		return Array.from(map.entries()).map(([label, count]) => ({
			label: `${label}`,
			count,
		}));
	}, [enriched]);

	return (
		<TooltipProvider>
			<div className="2xl:flex 2xl:gap-6 w-full">
				{/* Chart section */}
				<div className="2xl:flex-1 2xl:max-w-[calc(100%-460px)] max-w-[100%]">
					<div className="w-full h-[500px] min-h-[360px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={decisionCounts}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="label"
									tick={{ fontSize: 12 }}
									interval={0}
									angle={-15}
									textAnchor="end"
									height={70}
								/>
								<YAxis />
								<RTooltip
									formatter={(value) => [
										`${value} ${t("analytics.employees")}`,
										"",
									]}
									labelFormatter={(label) => label}
								/>
								<Bar dataKey="count" fill="#D97706" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Controls section */}
				<div className="mt-4 2xl:mt-0 2xl:flex-shrink-0">
					<div className="text-xl font-bold leading-none">
						{t("analytics.adjustThresholds")}
					</div>
					<div className="mt-4 space-y-3">
						{/* Card 1 */}
						<Card>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-1">
											<span className="text-sm font-normal text-stone-800">
												{t("analytics.asiFullAgentizationThreshold")}
											</span>
											<Tooltip>
												<TooltipTrigger>
													<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
												</TooltipTrigger>
												<TooltipContent className="max-w-[250px]">
													<p>{t("analytics.asiTooltip")}</p>
												</TooltipContent>
											</Tooltip>
										</div>
										<Input
											value={asiT1.toString()}
											onChange={(e) => setAsiT1(Number(e.target.value))}
											className="w-16 h-8 text-center text-sm"
										/>
									</div>
									<Slider
										value={[asiT1]}
										min={40}
										max={95}
										step={1}
										onValueChange={([v]) => setAsiT1(v)}
										className="w-full"
									/>
								</div>
							</CardContent>
						</Card>

						{/* Card 2 */}
						<Card>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-1">
											<span className="text-sm font-normal text-stone-800">
												{t("analytics.asiPartialThreshold")}
											</span>
											<Tooltip>
												<TooltipTrigger>
													<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
												</TooltipTrigger>
												<TooltipContent className="max-w-[250px]">
													<p>{t("analytics.asiTooltip")}</p>
												</TooltipContent>
											</Tooltip>
										</div>
										<Input
											value={asiT2.toString()}
											onChange={(e) => setAsiT2(Number(e.target.value))}
											className="w-16 h-8 text-center text-sm"
										/>
									</div>
									<Slider
										value={[asiT2]}
										min={40}
										max={90}
										step={1}
										onValueChange={([v]) => setAsiT2(v)}
										className="w-full"
									/>
								</div>
							</CardContent>
						</Card>

						{/* Card 3 */}
						<Card>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-1">
											<span className="text-sm font-normal text-stone-800">
												{t("analytics.pliHighThreshold")}
											</span>
											<Tooltip>
												<TooltipTrigger>
													<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
												</TooltipTrigger>
												<TooltipContent className="max-w-[250px]">
													<p>{t("analytics.pliTooltip")}</p>
												</TooltipContent>
											</Tooltip>
										</div>
										<Input
											value={pliT1.toString()}
											onChange={(e) => setPliT1(Number(e.target.value))}
											className="w-16 h-8 text-center text-sm"
										/>
									</div>
									<Slider
										value={[pliT1]}
										min={50}
										max={90}
										step={1}
										onValueChange={([v]) => setPliT1(v)}
										className="w-full"
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}
