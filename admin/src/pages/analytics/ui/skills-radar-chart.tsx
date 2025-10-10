"use client";

import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { calculateAverageSkills, type Employee } from "../model/constants";

const chartConfig = {
	value: {
		label: "Значение",
		color: "#D97706",
	},
} satisfies ChartConfig;

type SkillsRadarChartProps = {
	filteredEmployees: Employee[];
};

export function SkillsRadarChart({ filteredEmployees }: SkillsRadarChartProps) {
	const { t } = useTranslation();
	const averageSkills = calculateAverageSkills(filteredEmployees);

	const chartData = [
		{ skill: "SLR", value: averageSkills.SLR },
		{ skill: "PRL", value: averageSkills.PRL },
		{ skill: "TPL", value: averageSkills.TPL },
		{ skill: "PIT", value: averageSkills.PIT },
		{ skill: "EPR", value: averageSkills.EPR },
		{ skill: "GCS", value: averageSkills.GCS },
	];
	return (
		<TooltipProvider>
			<div className="flex gap-6">
				<div className="flex-1">
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-[280px]"
					>
						<RadarChart data={chartData}>
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<PolarAngleAxis dataKey="skill" className="text-sm" />
							<PolarGrid gridType="polygon" radialLines={false} />
							<Radar
								dataKey="value"
								fill="#D97706"
								fillOpacity={0.6}
								stroke="#D97706"
								strokeWidth={2}
							/>
						</RadarChart>
					</ChartContainer>
				</div>

				<div className="grid grid-cols-3 gap-3 min-w-[320px]">
					{chartData.map((item) => (
						<Card className="gap-1" key={item.skill}>
							<CardHeader>
								<div className="flex items-center gap-1">
									<span className="text-base font-semibold text-gray-900">
										{item.skill}
									</span>
									<Tooltip>
										<TooltipTrigger>
											<Info className="w-4 h-4 opacity-50 hover:opacity-100 cursor-help transition-opacity" />
										</TooltipTrigger>
										<TooltipContent className="max-w-[250px]">
											<p>{getSkillTooltip(item.skill, t)}</p>
										</TooltipContent>
									</Tooltip>
								</div>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="flex flex-col gap-1">
									<span className="text-xl font-bold text-gray-900">
										{item.value}
									</span>
									<span className="text-xs font-medium text-gray-600 opacity-50">
										{getSkillDescription(item.skill)}
									</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</TooltipProvider>
	);
}

function getSkillDescription(skill: string): string {
	const descriptions: Record<string, string> = {
		SLR: "сильная сторона",
		PRL: "зона стабильности",
		TPL: "зона стабильности",
		PIT: "фокус для тренинга",
		EPR: "зона стабильности",
		GCS: "зона стабильности",
	};
	return descriptions[skill] || "зона стабильности";
}

function getSkillTooltip(skill: string, t: any): string {
	const tooltipKeys: Record<string, string> = {
		SLR: "analytics.slrTooltip",
		PRL: "analytics.prlTooltip",
		TPL: "analytics.tplTooltip",
		PIT: "analytics.pitTooltip",
		EPR: "analytics.eprTooltip",
		GCS: "analytics.gcsTooltip",
	};
	return t(tooltipKeys[skill] || "analytics.slrTooltip");
}
