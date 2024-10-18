import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { EDayDTO, EDays } from "@/models/days.model";
import { NgClass } from "@angular/common";
import {EBreakpoints} from "@/models/viewport.model";

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
export class DaysOfTheWeek implements OnInit {
  daysOfTheWeek!: EDays[];
  todayDayOfTheWeek!: EDays;
  selectedDay!: EDays;
  spinnerDiameter!: number;
  spinnerStrokeWidth!: number;

  @Input() progressPercentage: number = 90;
  @Output() _dayClicked = new EventEmitter<EDayDTO>();

  constructor() {
    this.selectedDay = this.getTodayDayOfTheWeek();
  }

  ngOnInit(): void {
    this.setSpinnerProps();
    
    this.daysOfTheWeek = this.getDaysOfTheWeek();
    this.todayDayOfTheWeek = this.getTodayDayOfTheWeek();
    this.getDaysOfTheWeekDigits();
    
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setSpinnerProps();
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
  
  setSpinnerProps() {
    const screenWidth = window.innerWidth;
    if (screenWidth > EBreakpoints.MD) {
      this.spinnerDiameter = 60;
      this.spinnerStrokeWidth = 6;
    } else {
      this.spinnerDiameter = 40;
      this.spinnerStrokeWidth = 4;
    }
  }
}
