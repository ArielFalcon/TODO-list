export interface ITask {
	id: string;
	priority: number;
	title: string;
	description: string;
	deadline: Date;
	state: EState;
}

export enum EState {
	PENDANT= 'Pendiente',
	IN_PROGRESS = 'En progreso',
	DONE = 'Hecho',
}

export enum ETaskTableColumns {
	PRIORITY = 'priority',
	TITLE = 'title',
	DEADLINE = 'deadline',
	STATE = 'state',
}