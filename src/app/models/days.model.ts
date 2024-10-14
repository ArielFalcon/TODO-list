export enum EDays {
	Sunday = "Domingo",
	Monday = "Lunes",
	Tuesday = "Martes",
	Wednesday = "Miércoles",
	Thursday = "Jueves",
	Friday = "Viernes",
	Saturday = "Sábado",
}

export interface EDayDTO {
	day: EDays;
	date: number;
}