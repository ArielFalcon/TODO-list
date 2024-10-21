import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef, inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "@/components/_inputs/custom-input";
import {DateTime, Interval} from 'luxon';
import {ISimpleTimeDTO} from "@/models/time.model";
import {NgClass} from "@angular/common";
import {PlatformService} from "@/services/platform.service";

@Component({
  selector: 'app-input-datetime',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
  ],
  templateUrl: './input-datetime.component.html',
  styleUrl: './input-datetime.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDatetimeComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDatetimeComponent extends CustomInput implements OnInit, OnDestroy {
  distance!: Interval
  remainingTime!: ISimpleTimeDTO
  todayDate !: DateTime;
  private _selectedDate !: DateTime;
  userEnteredDate: string = '';
  countdownInterval: any;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  platformService = inject(PlatformService)
  
  get selectedDate(): DateTime {
    return this._selectedDate;
  }
  
  set selectedDate(value: string | DateTime) {
    //parses the input value to a DateTime object if needed
    if (typeof value === 'string' && DateTime.fromISO(value).isValid) {
      this._selectedDate = DateTime.fromISO(value);
    }
    if (value instanceof DateTime) {
      this._selectedDate = value;
    }
  }
  
  getFormattedSelectedDate(): string {
    return this.selectedDate.toFormat("yyyy-LL-dd'T'HH:mm");
  }
  
  ngOnInit() {
    //Initialize default date values
    this.todayDate = DateTime.now();
    this.selectedDate = DateTime.now().endOf('day');
    this.userEnteredDate = this.getFormattedSelectedDate();
    
    this.setClockTimer();
  }
  
  ngOnDestroy() {
    clearInterval(this.countdownInterval);
  }
  
  updateClockTimer() {
  //Updates the countdown timer inside the interval
    this.updateRemainingTime();
    
    if (this.isSelectedDateDone()) {
      clearInterval(this.countdownInterval);
    } else {
      this.updateDOMClockTimer();
    }
    
    this.cdr.detectChanges();
  }
  
  updateRemainingTime(): void {
    // Calculates the remaining time between the selected date and the current date and updates the value
    this.todayDate = DateTime.now();
    this.distance = Interval.fromDateTimes(this.todayDate, this.selectedDate);
    
    const days = Math.floor(this.distance.length('days'));
    const hours = Math.floor(this.distance.length('hours') - (days * 24));
    const minutes = Math.floor(this.distance.length('minutes') - (days * 24 * 60) - (hours * 60));
    const seconds = Math.floor(this.distance.length('seconds') - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60));
    
    this.remainingTime = {days, hours, minutes, seconds};
  }
  
  updateDOMClockTimer(time: ISimpleTimeDTO = this.remainingTime) {
    //Updates the linked-to-DOM values of the countdown timer
    if (!this.isSelectedDateDone()) {
      this.days = time.days;
      this.hours = time.hours;
      this.minutes = time.minutes;
      this.seconds = time.seconds;
    }
  }
  
  setClockTimer() {
    //Configures the countdown timer
    if (this.platformService.isBrowser()) {
      clearInterval(this.countdownInterval);
      this.selectedDate = this.userEnteredDate
      
      this.updateRemainingTime();
      this.updateDOMClockTimer();
      
      this.countdownInterval = setInterval(() => {
        this.updateClockTimer();
      }, 1000);
    }
  }
  
  isSelectedDateDone() {
    return !this.distance?.contains(this.todayDate)
  }
}

