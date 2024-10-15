import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Subscription } from "rxjs";
import { EDayDTO, EDays } from "@/models/days.model";
import { NgClass } from "@angular/common";



@Component({
  selector: 'app-days-of-the-week',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    NgClass
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
  selectedDay!: EDays;

  @Input() progressPercentage: number = 90;
  @Output() _dayClicked = new EventEmitter<EDayDTO>();

  constructor() {
    this.setSpinnerDiameter();
    window.addEventListener('resize', this.setSpinnerDiameter.bind(this));
    this.selectedDay = this.getTodayDayOfTheWeek();
  }

  ngOnInit(): void {
    this.daysOfTheWeek = this.getDaysOfTheWeek();
    this.todayDayOfTheWeek = this.getTodayDayOfTheWeek();
    this.getDaysOfTheWeekDigits();

    this.setSpinnerDiameter();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setSpinnerDiameter();
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
    this.changeSelectedDay(day);
    this._dayClicked.emit({
      day,
      date,
    });
  }

  changeSelectedDay(day: EDays): void {
    this.selectedDay = day;
  }

  setSpinnerDiameter() {
    const screenWidth = window.innerWidth;
    console.log('screenWidth prev', screenWidth);
    if (screenWidth > 1200) {
      console.log('screenWidth', screenWidth);
      this.spinnerDiameter = screenWidth * 0.1 > 60 ? 60 : screenWidth * 0.1;
    } else {
      console.log('screenWidth l', screenWidth);
      this.spinnerDiameter = screenWidth * 0.02 < 40 ? 40 : screenWidth * 0.05;
    }
  }
}
