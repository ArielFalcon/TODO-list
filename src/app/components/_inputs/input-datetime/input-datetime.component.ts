import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  OnDestroy, OnInit,
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
export class InputDatetimeComponent extends CustomInput implements OnInit, AfterViewInit, OnDestroy {
  distance!: Interval
  todayDate : DateTime = DateTime.now();
  private _selectedDate : DateTime = this.todayDate.endOf('day');
  userEnteredDate: string = this.getFormattedSelectedDate();
  remainingTime!: ISimpleTimeDTO
  countdownInterval: any;
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  platformService = inject(PlatformService)
  
  get selectedDate(): DateTime {
    return this._selectedDate;
  }
  
  set selectedDate(value: string | DateTime | null) {
    //parses the input value to a DateTime object if needed
    if (typeof value === 'string') {
      const parsedDate = DateTime.fromISO(value)
      if (parsedDate.isValid) {
        this._selectedDate = parsedDate;
      }
    }
    if (value instanceof DateTime) {
      this._selectedDate = value;
    }
    
    if (this._selectedDate) {
      this.userEnteredDate = this.getFormattedSelectedDate();
      this.onInputChange();
    }
  }
  
  getFormattedSelectedDate(): string {
    return this.selectedDate.toFormat("yyyy-LL-dd'T'HH:mm");
  }
  
  ngOnInit() {
    this.updateRemainingTime()
  }
  
  override ngAfterViewInit() {
    //Initialize default date values
    super.ngAfterViewInit();
    this.selectedDate = this.value;
    
    if (this.inputElement) {
      this.inputElement.nativeElement.value = this.getFormattedSelectedDate();
    }
    
    this.setClockTimer();
  }
  
  ngOnDestroy() {
    clearInterval(this.countdownInterval);
  }
  
  override onInputChange(): void {
    super.onInputChange();
    this.cdr.markForCheck();
  }
  
  updateClockTimer() {
  //Updates the countdown timer inside the interval
    this.updateRemainingTime();
    
    if (this.isSelectedDateDone()) {
      clearInterval(this.countdownInterval);
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
  
  setClockTimer() {
    //Configures the countdown timer
    if (this.platformService.isBrowser()) {
      clearInterval(this.countdownInterval);
      this.selectedDate = this.userEnteredDate
      
      this.updateRemainingTime();
      this.countdownInterval = setInterval(() => {
        this.updateClockTimer();
      }, 1000);
    }
  }
  
  isSelectedDateDone() {
    return !this.distance?.contains(this.todayDate)
  }
  
}

