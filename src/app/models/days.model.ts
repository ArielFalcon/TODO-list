export enum EDays {
	Sunday = "dom",
	Monday = "lun",
	Tuesday = "mar",
	Wednesday = "mié",
	Thursday = "jue",
	Friday = "vie",
	Saturday = "sáb",
}

export interface EDayDTO {
	day: EDays;
	date: number;
}