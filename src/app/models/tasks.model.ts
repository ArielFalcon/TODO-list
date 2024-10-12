import { Timestamp } from 'firebase/firestore';

export interface ITaskDTO {
	title: string;
	description: string;
	priority: number;
	deadline: Timestamp;
	state: EState;
}

export interface ITask extends ITaskDTO {
	id: string;
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
	ACTION = 'action',
}