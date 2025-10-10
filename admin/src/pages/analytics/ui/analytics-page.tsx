import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "@/core/sidebar/store/user-store";
import { demoEmployees } from "../model/constants";
import { AnalyticsFilters } from "./analytics-filters";
import { AnalyticsMain } from "./analytics-main";

export function AnalyticsPage() {
	const navigate = useNavigate();
	const { currentOrganization } = useUserStore();
	const [search, setSearch] = useState("");
	const [unit, setUnit] = useState("all");
	const [role, setRole] = useState("all");
	const [noRiskOnly, setNoRiskOnly] = useState(false);

	useEffect(() => {
		if (currentOrganization?.id !== "f7418460-7c6f-4975-98af-9e282fa74c22") {
			navigate({ to: "/profile" });
		}
	}, [currentOrganization, navigate]);

	const filteredEmployees = useMemo(() => {
		return demoEmployees.filter((employee) => {
			// Search filter
			const searchMatch =
				search === "" ||
				employee.name.toLowerCase().includes(search.toLowerCase()) ||
				employee.role.toLowerCase().includes(search.toLowerCase()) ||
				employee.unit.toLowerCase().includes(search.toLowerCase());

			// Unit filter
			const unitMatch = unit === "all" || employee.unit === unit;

			// Role filter
			const roleMatch = role === "all" || employee.role === role;

			// Risk filter
			const riskMatch = !noRiskOnly || !employee.risk;

			return searchMatch && unitMatch && roleMatch && riskMatch;
		});
	}, [search, unit, role, noRiskOnly]);

	return (
		<div>
			<AnalyticsFilters
				search={search}
				setSearch={setSearch}
				unit={unit}
				setUnit={setUnit}
				role={role}
				setRole={setRole}
				noRiskOnly={noRiskOnly}
				setNoRiskOnly={setNoRiskOnly}
				filteredEmployees={filteredEmployees}
			/>
			<AnalyticsMain filteredEmployees={filteredEmployees} />
		</div>
	);
}
