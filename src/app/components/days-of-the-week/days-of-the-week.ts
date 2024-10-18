import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input, OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { EDayDTO, EDays } from "@/models/days.model";
import { NgClass } from "@angular/common";
import {EBreakpoints} from "@/models/viewport.model";
import {PlatformService} from "@/services/platform.service";
import {Subscription} from "rxjs";


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
export class DaysOfTheWeek implements OnInit, AfterViewInit, OnDestroy {
  private resizeSubscription!: Subscription;
  daysOfTheWeek!: EDays[];
  todayDayOfTheWeek!: EDays;
  selectedDay!: EDays;
  spinnerDiameter!: number;
  spinnerStrokeWidth!: number;
  platformService = inject(PlatformService);
  cdr = inject(ChangeDetectorRef);

  @Input() progressPercentage: number = 40;
  @Output() _dayClicked = new EventEmitter<EDayDTO>();
  @ViewChildren('dayElement') dayElements!: QueryList<ElementRef>;
  
  constructor() {
    this.selectedDay = this.getTodayDayOfTheWeek();
  }

  ngOnInit(): void {
    this.setSpinnerProps(this.platformService.windowWidth);

    this.daysOfTheWeek = this.getDaysOfTheWeek();
    this.todayDayOfTheWeek = this.getTodayDayOfTheWeek();
    this.getDaysOfTheWeekDigits();
  }
  
  ngAfterViewInit() {
    this.scrollToSelectedDay();
    
    this.resizeSubscription = this.platformService.resize$.subscribe((width: number) => {
      if (width) this.setSpinnerProps(width);
      this.cdr.detectChanges();
    })
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
    this.scrollToSelectedDay();
  }
  
  setSpinnerProps(width: number) {
      if (width > EBreakpoints.MD) {
        console.log('setting spinner props to large')
        this.spinnerDiameter = 60;
        this.spinnerStrokeWidth = 6;
      } else {
        console.log('setting spinner props to small')
        this.spinnerDiameter = 40;
        this.spinnerStrokeWidth = 4;
      }
  }
  
  scrollToSelectedDay() {
    if (this.platformService.isBrowser()) {
    const selectedIndex = this.daysOfTheWeek.indexOf(this.selectedDay);
    const selectedElement = this.dayElements.toArray()[selectedIndex];
    
    if (selectedElement) {
      selectedElement.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
    }
  }
}
