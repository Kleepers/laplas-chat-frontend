export type Employee = {
	id: number;
	name: string;
	role: string;
	unit: string;
	tasks: number;
	asi: number;
	pli: number;
	risk: boolean;
	col: number;
	judg: number;
	clusters: string[];
};

type Skills = {
	SLR: number;
	PRL: number;
	TPL: number;
	PIT: number;
	EPR: number;
	GCS: number;
};

function clamp(value: number, min = 0, max = 100): number {
	return Math.max(min, Math.min(max, value));
}

// Heuristic demo skills per employee based on ASI/PLI/Risk (for UI only)
export function estSkillsFor(e: Employee): Skills {
	const b = e.pli;
	return {
		SLR: clamp(100 - Math.abs(b - 70) * 1.2),
		PRL: clamp(b - 5 + (e.asi - 60) * 0.2),
		TPL: clamp(b - 10 + (e.tasks > 200 ? 6 : 0)),
		PIT: clamp(50 + (e.asi - 50) * 0.6 - e.col * 0.4),
		EPR: clamp(b - 8),
		GCS: clamp(78 - (e.risk ? 25 : 0) - e.judg * 0.3),
	};
}

// Calculate average skills across all employees
export function calculateAverageSkills(employees: Employee[]): Skills {
	if (employees.length === 0) {
		return { SLR: 0, PRL: 0, TPL: 0, PIT: 0, EPR: 0, GCS: 0 };
	}

	const total = employees.reduce(
		(acc, employee) => {
			const skills = estSkillsFor(employee);
			return {
				SLR: acc.SLR + skills.SLR,
				PRL: acc.PRL + skills.PRL,
				TPL: acc.TPL + skills.TPL,
				PIT: acc.PIT + skills.PIT,
				EPR: acc.EPR + skills.EPR,
				GCS: acc.GCS + skills.GCS,
			};
		},
		{ SLR: 0, PRL: 0, TPL: 0, PIT: 0, EPR: 0, GCS: 0 },
	);

	return {
		SLR: Math.round(total.SLR / employees.length),
		PRL: Math.round(total.PRL / employees.length),
		TPL: Math.round(total.TPL / employees.length),
		PIT: Math.round(total.PIT / employees.length),
		EPR: Math.round(total.EPR / employees.length),
		GCS: Math.round(total.GCS / employees.length),
	};
}

export const demoEmployees: Employee[] = [
	{ id: 1, name: "Иван Петров", role: "Саппорт L1", unit: "Поддержка", tasks: 420, asi: 86, pli: 48, risk: false, col: 20, judg: 15, clusters: ["FAQ", "Пароли", "Доставка"] },
	{ id: 2, name: "Ольга Иванова", role: "Копирайтер", unit: "Маркетинг", tasks: 190, asi: 68, pli: 74, risk: false, col: 25, judg: 35, clusters: ["Лендинги", "Посты", "E-mail"] },
	{ id: 3, name: "Дилшод Каримов", role: "Аналитик", unit: "Продукт", tasks: 160, asi: 62, pli: 79, risk: false, col: 30, judg: 40, clusters: ["SQL отчёты", "AB-тесты", "Дашборды"] },
	{ id: 4, name: "Джон Смит", role: "Менеджер по продажам", unit: "Sales", tasks: 250, asi: 55, pli: 68, risk: true, col: 70, judg: 65, clusters: ["Переговоры", "Офферы", "Счета"] },
	{ id: 5, name: "Наталья Орлова", role: "Саппорт L1", unit: "Поддержка", tasks: 370, asi: 82, pli: 83, risk: false, col: 18, judg: 12, clusters: ["Возвраты", "FAQ", "Оплата"] },
	{ id: 6, name: "Артём Ким", role: "Аналитик", unit: "Продукт", tasks: 140, asi: 77, pli: 52, risk: false, col: 28, judg: 35, clusters: ["SQL", "ETL", "Фичи"] },
	{ id: 7, name: "Мария Ли", role: "HR-специалист", unit: "HR", tasks: 120, asi: 43, pli: 71, risk: true, col: 60, judg: 80, clusters: ["Собеседования", "Офферы", "Политики"] },
	{ id: 8, name: "Глеб Соколов", role: "SMM", unit: "Маркетинг", tasks: 210, asi: 72, pli: 58, risk: false, col: 20, judg: 30, clusters: ["Посты", "Сторис", "Календарь"] },
	{ id: 9, name: "Елена Мартынова", role: "Саппорт L2", unit: "Поддержка", tasks: 150, asi: 66, pli: 65, risk: false, col: 35, judg: 25, clusters: ["Эскалации", "Биллинги", "Инциденты"] },
	{ id: 10, name: "Тимур Ахмедов", role: "QA-инженер", unit: "R&D", tasks: 180, asi: 81, pli: 72, risk: false, col: 15, judg: 20, clusters: ["Тест-кейсы", "Регресс", "Автотесты"] },
	{ id: 11, name: "Евгения Румянцева", role: "Менеджер проекта", unit: "Продукт", tasks: 130, asi: 59, pli: 76, risk: true, col: 65, judg: 75, clusters: ["Планирование", "Релизы", "Эскалации"] },
	{ id: 12, name: "Сергей Антонов", role: "Оператор", unit: "Операции", tasks: 310, asi: 84, pli: 54, risk: false, col: 22, judg: 18, clusters: ["Заявки", "Документы", "CRM"] },
	{ id: 13, name: "Анна Волкова", role: "Саппорт L1", unit: "Поддержка", tasks: 395, asi: 79, pli: 56, risk: false, col: 24, judg: 20, clusters: ["FAQ", "Возвраты", "Пароли"] },
	{ id: 14, name: "Максим Федоров", role: "Копирайтер", unit: "Маркетинг", tasks: 175, asi: 71, pli: 69, risk: false, col: 30, judg: 28, clusters: ["Лендинги", "E-mail", "Посты"] },
	{ id: 15, name: "Светлана Попова", role: "Аналитик", unit: "Продукт", tasks: 145, asi: 65, pli: 74, risk: false, col: 32, judg: 42, clusters: ["SQL отчёты", "Дашборды", "AB-тесты"] },
	{ id: 16, name: "Алексей Морозов", role: "Менеджер по продажам", unit: "Sales", tasks: 280, asi: 52, pli: 63, risk: true, col: 75, judg: 70, clusters: ["Переговоры", "Счета", "Офферы"] },
	{ id: 17, name: "Ирина Козлова", role: "Саппорт L2", unit: "Поддержка", tasks: 165, asi: 68, pli: 71, risk: false, col: 28, judg: 30, clusters: ["Эскалации", "Инциденты", "Биллинги"] },
	{ id: 18, name: "Дмитрий Новиков", role: "QA-инженер", unit: "R&D", tasks: 195, asi: 78, pli: 67, risk: false, col: 18, judg: 25, clusters: ["Тест-кейсы", "Автотесты", "Регресс"] },
	{ id: 19, name: "Елена Павлова", role: "HR-специалист", unit: "HR", tasks: 110, asi: 46, pli: 68, risk: true, col: 65, judg: 85, clusters: ["Собеседования", "Политики", "Офферы"] },
	{ id: 20, name: "Андрей Белов", role: "SMM", unit: "Маркетинг", tasks: 225, asi: 74, pli: 61, risk: false, col: 22, judg: 33, clusters: ["Посты", "Календарь", "Сторис"] },
	{ id: 21, name: "Юлия Романова", role: "Оператор", unit: "Операции", tasks: 290, asi: 82, pli: 49, risk: false, col: 20, judg: 15, clusters: ["Заявки", "CRM", "Документы"] },
	{ id: 22, name: "Владимир Тихонов", role: "Менеджер проекта", unit: "Продукт", tasks: 125, asi: 56, pli: 78, risk: true, col: 70, judg: 72, clusters: ["Планирование", "Эскалации", "Релизы"] },
	{ id: 23, name: "Татьяна Семёнова", role: "Саппорт L1", unit: "Поддержка", tasks: 405, asi: 83, pli: 44, risk: false, col: 19, judg: 18, clusters: ["FAQ", "Доставка", "Оплата"] },
	{ id: 24, name: "Роман Кузнецов", role: "Аналитик", unit: "Продукт", tasks: 155, asi: 69, pli: 73, risk: false, col: 26, judg: 38, clusters: ["SQL", "Фичи", "ETL"] },
	{ id: 25, name: "Марина Лебедева", role: "Копирайтер", unit: "Маркетинг", tasks: 185, asi: 66, pli: 72, risk: false, col: 28, judg: 32, clusters: ["Лендинги", "Посты", "E-mail"] },
	{ id: 26, name: "Кирилл Орлов", role: "Менеджер по продажам", unit: "Sales", tasks: 265, asi: 58, pli: 65, risk: true, col: 68, judg: 62, clusters: ["Переговоры", "Офферы", "Счета"] },
	{ id: 27, name: "Ольга Васильева", role: "QA-инженер", unit: "R&D", tasks: 170, asi: 80, pli: 70, risk: false, col: 16, judg: 22, clusters: ["Тест-кейсы", "Регресс", "Автотесты"] },
	{ id: 28, name: "Николай Медведев", role: "Саппорт L2", unit: "Поддержка", tasks: 140, asi: 64, pli: 68, risk: false, col: 33, judg: 27, clusters: ["Эскалации", "Биллинги", "Инциденты"] },
	{ id: 29, name: "Людмила Зайцева", role: "HR-специалист", unit: "HR", tasks: 115, asi: 41, pli: 69, risk: true, col: 62, judg: 82, clusters: ["Собеседования", "Офферы", "Политики"] },
	{ id: 30, name: "Павел Гришин", role: "SMM", unit: "Маркетинг", tasks: 200, asi: 70, pli: 59, risk: false, col: 25, judg: 35, clusters: ["Посты", "Сторис", "Календарь"] },
	{ id: 31, name: "Екатерина Королёва", role: "Оператор", unit: "Операции", tasks: 320, asi: 85, pli: 51, risk: false, col: 21, judg: 16, clusters: ["Заявки", "Документы", "CRM"] },
	{ id: 32, name: "Станислав Егоров", role: "Аналитик", unit: "Продукт", tasks: 150, asi: 61, pli: 76, risk: false, col: 29, judg: 41, clusters: ["SQL отчёты", "AB-тесты", "Дашборды"] },
	{ id: 33, name: "Алёна Макарова", role: "Саппорт L1", unit: "Поддержка", tasks: 385, asi: 81, pli: 47, risk: false, col: 23, judg: 19, clusters: ["FAQ", "Пароли", "Возвраты"] },
	{ id: 34, name: "Игорь Жуков", role: "Менеджер проекта", unit: "Продукт", tasks: 135, asi: 57, pli: 74, risk: true, col: 72, judg: 76, clusters: ["Планирование", "Релизы", "Эскалации"] },
	{ id: 35, name: "Виктория Борисова", role: "Копирайтер", unit: "Маркетинг", tasks: 180, asi: 67, pli: 71, risk: false, col: 27, judg: 31, clusters: ["Лендинги", "E-mail", "Посты"] },
	{ id: 36, name: "Денис Крылов", role: "Менеджер по продажам", unit: "Sales", tasks: 240, asi: 54, pli: 66, risk: true, col: 73, judg: 68, clusters: ["Переговоры", "Счета", "Офферы"] },
	{ id: 37, name: "Галина Степанова", role: "QA-инженер", unit: "R&D", tasks: 175, asi: 79, pli: 69, risk: false, col: 17, judg: 24, clusters: ["Тест-кейсы", "Автотесты", "Регресс"] },
	{ id: 38, name: "Артур Никитин", role: "Саппорт L2", unit: "Поддержка", tasks: 155, asi: 67, pli: 63, risk: false, col: 36, judg: 29, clusters: ["Эскалации", "Инциденты", "Биллинги"] },
	{ id: 39, name: "Лариса Комарова", role: "HR-специалист", unit: "HR", tasks: 105, asi: 44, pli: 67, risk: true, col: 63, judg: 78, clusters: ["Собеседования", "Политики", "Офферы"] },
	{ id: 40, name: "Олег Фролов", role: "SMM", unit: "Маркетинг", tasks: 215, asi: 73, pli: 57, risk: false, col: 21, judg: 29, clusters: ["Посты", "Календарь", "Сторис"] },
	{ id: 41, name: "Надежда Михайлова", role: "Оператор", unit: "Операции", tasks: 305, asi: 83, pli: 53, risk: false, col: 24, judg: 17, clusters: ["Заявки", "CRM", "Документы"] },
	{ id: 42, name: "Константин Сидоров", role: "Аналитик", unit: "Продукт", tasks: 165, asi: 63, pli: 77, risk: false, col: 31, judg: 39, clusters: ["SQL", "ETL", "Фичи"] },
	{ id: 43, name: "Валентина Костина", role: "Саппорт L1", unit: "Поддержка", tasks: 390, asi: 84, pli: 46, risk: false, col: 22, judg: 21, clusters: ["FAQ", "Доставка", "Оплата"] },
	{ id: 44, name: "Евгений Голубев", role: "Менеджер по продажам", unit: "Sales", tasks: 270, asi: 53, pli: 64, risk: true, col: 69, judg: 66, clusters: ["Переговоры", "Офферы", "Счета"] },
	{ id: 45, name: "Инна Панова", role: "Копирайтер", unit: "Маркетинг", tasks: 195, asi: 69, pli: 73, risk: false, col: 26, judg: 30, clusters: ["Лендинги", "Посты", "E-mail"] },
	{ id: 46, name: "Руслан Беляев", role: "QA-инженер", unit: "R&D", tasks: 185, asi: 76, pli: 71, risk: false, col: 19, judg: 23, clusters: ["Тест-кейсы", "Регресс", "Автотесты"] },
	{ id: 47, name: "Жанна Соловьёва", role: "Менеджер проекта", unit: "Продукт", tasks: 140, asi: 58, pli: 75, risk: true, col: 67, judg: 74, clusters: ["Планирование", "Эскалации", "Релизы"] },
	{ id: 48, name: "Вячеслав Исаев", role: "Саппорт L2", unit: "Поддержка", tasks: 160, asi: 65, pli: 66, risk: false, col: 34, judg: 26, clusters: ["Эскалации", "Биллинги", "Инциденты"] },
	{ id: 49, name: "Елизавета Власова", role: "HR-специалист", unit: "HR", tasks: 125, asi: 42, pli: 70, risk: true, col: 61, judg: 81, clusters: ["Собеседования", "Офферы", "Политики"] },
	{ id: 50, name: "Геннадий Лазарев", role: "Оператор", unit: "Операции", tasks: 315, asi: 86, pli: 50, risk: false, col: 23, judg: 14, clusters: ["Заявки", "Документы", "CRM"] },
  ];