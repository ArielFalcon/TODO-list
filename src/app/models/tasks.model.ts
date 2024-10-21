export interface ITaskDTO {
	title: string;
	description: string | null;
	priority: number | null;
	deadline: string | null;
	state: EState | null;
	goal: number | null;
	goalMetric: EGoalMetrics | null;
	frequency: EFrequency | null;
}

export interface ITask extends ITaskDTO {
	id: string;
}

export enum EState {
	PENDANT= 'Pendiente',
	IN_PROGRESS = 'En progreso',
	DONE = 'Hecho',
}

export enum EGoalMetrics {
	MINUTES = 'Minutos',
	HOURS = 'Horas',
	TIMES = 'Veces',
	LITRES = 'Litros',
	
}

export enum EFrequency {
	DAILY = 'Diario',
	WEEKLY = 'Semanal',
	MONTHLY = 'Mensual',
}

export enum ETaskTableColumns {
	PRIORITY = 'priority',
	TITLE = 'title',
	DEADLINE = 'deadline',
	STATE = 'state',
	ACTION = 'action',
}