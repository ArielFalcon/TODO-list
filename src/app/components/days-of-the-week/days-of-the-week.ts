import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

export enum EDays {
	Sunday = "Domingo",
	Monday = "Lunes",
	Tuesday = "Martes",
	Wednesday = "Miércoles",
	Thursday = "Jueves",
	Friday = "Viernes",
	Saturday = "Sábado",
}

@Component({
	selector: 'app-days-of-the-week',
	standalone: true,
	imports: [
		MatProgressSpinnerModule
	],
	templateUrl: './days-of-the-week.html',
	styleUrl: './days-of-the-week.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysOfTheWeek implements OnInit {
	daysOfTheWeek!: EDays[];
	todayDayOfTheWeek!: EDays;
	spinnerDiameter!: number;
	@Input() progressPercentage: number = 90;
	
	constructor() {
		this.setSpinnerDiameter();
		window.addEventListener('resize', this.setSpinnerDiameter.bind(this));
	}
	
	ngOnInit(): void {
		this.daysOfTheWeek = this.getDaysOfTheWeek();
		this.todayDayOfTheWeek = this.getTodayDayOfTheWeek();
	}
	
	getDaysOfTheWeek(): EDays[] {
		return Object.values(EDays);
	}
	
	getTodayDayOfTheWeek(): EDays {
		console.log(this.getDaysOfTheWeek())
		return this.getDaysOfTheWeek()[new Date().getDay()];
	}
	
	isToday(day: EDays): boolean {
		return day === this.todayDayOfTheWeek;
	}
	
	get isDone(): boolean {
		return this.progressPercentage === 100;
	}
	
	setSpinnerDiameter() {
		const screenWidth = window.innerWidth;
		if (screenWidth < 600) {
			this.spinnerDiameter = screenWidth * 0.1; // 10% para pantallas pequeñas
		} else {
			this.spinnerDiameter = screenWidth * 0.05; // 5% para pantallas grandes
		}
	}
}
