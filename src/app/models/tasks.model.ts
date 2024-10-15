import { Timestamp } from 'firebase/firestore';

export interface ITaskDTO {
	title: string;
	description: string | null;
	priority: number | null;
	deadline: Timestamp | null;
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

export class Task implements ITaskDTO {
	constructor(
		public title: string = '',
		public description:string|null = "Estudiar bases de datos desde el inicio, instalar MySQL y trabajar con la consola de comandos.",
		public priority: number = 0,
		public deadline: Timestamp = Timestamp.now(),
		public state: EState = EState.PENDANT,
		public goal: number = 0,
		public goalMetric: EGoalMetrics = EGoalMetrics.TIMES,
		public frequency: EFrequency = EFrequency.DAILY,
	) {}
}