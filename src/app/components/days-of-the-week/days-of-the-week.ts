import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {WindowRefService} from "@/services/window-ref.service";
import {debounceTime, Subscription} from "rxjs";
import {EDayDTO, EDays} from "@/models/days.model";



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
export class DaysOfTheWeek implements OnInit, OnDestroy {
	daysOfTheWeek!: EDays[];
	todayDayOfTheWeek!: EDays;
	spinnerDiameter!: number;
	resizeSubscription!: Subscription;
	
	@Input() progressPercentage: number = 90;
	@Output() _dayClicked = new EventEmitter<EDayDTO>();
	
	constructor(
		private readonly windowRef: WindowRefService,
	) {
		this.setSpinnerDiameter();
		window.addEventListener('resize', this.setSpinnerDiameter.bind(this));
	}
	
	ngOnInit(): void {
		this.daysOfTheWeek = this.getDaysOfTheWeek();
		this.todayDayOfTheWeek = this.getTodayDayOfTheWeek();
		this.getDaysOfTheWeekDigits();
		
		this.setSpinnerDiameter();
		this.resizeSubscription = this.windowRef.onResize()
			.pipe(debounceTime(200))
			.subscribe(() => {
				this.setSpinnerDiameter();
			});
	}
	
	ngOnDestroy() {
		if (this.resizeSubscription) {
			this.resizeSubscription.unsubscribe();
		}
	}
	
	getDaysOfTheWeek(): EDays[] {
		return Object.values(EDays);
	}
	
	getDaysOfTheWeekDigits(): number[] {
		const daysDigits = [];
		const today = new Date();
		const currentDayOfWeekDigit = today.getDay();
		
		for (let i = 0; i < this.daysOfTheWeek.length; i++) {
			const day = new Date();
			day.setDate(today.getDate() - currentDayOfWeekDigit + i);
			daysDigits.push(day.getDate());
		}
		
		return daysDigits;
	}
	
	getTodayDayOfTheWeek(): EDays {
		return this.getDaysOfTheWeek()[new Date().getDay()];
	}
	
	isToday(day: EDays): boolean {
		return day === this.todayDayOfTheWeek;
	}
	
	get isDone(): boolean {
		return this.progressPercentage === 100;
	}
	
	onClick(day: EDays, date: number): void {
		console.log(`Clicked on ${day}, ${date}`);
		this._dayClicked.emit({
			day,
			date,
		});
	}
	
	setSpinnerDiameter() {
		const window = this.windowRef.nativeWindow;
		if (window) {
			const screenWidth = window.innerWidth;
			if (screenWidth < 600) {
				this.spinnerDiameter = screenWidth * 0.1; // 10% para pantallas pequeñas
			} else {
				this.spinnerDiameter = screenWidth * 0.05; // 5% para pantallas grandes
			}
		}
	}
}
