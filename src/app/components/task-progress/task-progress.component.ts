import {ChangeDetectionStrategy, Component, computed, input, InputSignal, OnInit, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgClass} from "@angular/common";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {ITaskDTO} from "@/models/tasks.model";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {TaskDetailsComponent} from "@/components/task-details/task-details.component";

@Component({
  selector: 'app-task-progress',
  standalone: true,
  imports: [
    MatIcon,
    NgClass,
    MatMiniFabButton,
    DatePipe,
    MatExpansionModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    TaskDetailsComponent,
    MatButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.scss']
})
export class TaskProgressComponent implements OnInit{
  task: InputSignal<ITaskDTO> = input.required<ITaskDTO>();
  private readonly maxProgress = 100;
  _progressPercentage = signal(this.task().percentage);
  previousProgressPercentage = signal(0);
  percentageStep = computed(() => Math.round(100 / (this.task().goal ?? 100)));
  progressIndicator = computed(() => `${Math.round(this.progressPercentage / this.percentageStep())}/${this.task().goal}`);
  
  ngOnInit() {
    this.previousProgressPercentage.set(this.task().percentage);
  }
  
  get progressPercentage() {
    return this._progressPercentage();
  }
  
  set progressPercentage(value: number) {
    if(value >= 0 && value <= 100) {
      this.task().percentage = value;
    }
    if (value >= 100) {
      this.task().percentage = 100;
    }
  }
  
  get progressColor() {
    switch (true) {
      case (this.progressPercentage <= 20):
        return 'color-step-1';
      case (this.progressPercentage > 20 && this.progressPercentage <= 40):
        return 'color-step-2';
      case (this.progressPercentage > 40 && this.progressPercentage <= 60):
        return 'color-step-3';
      case (this.progressPercentage > 60 && this.progressPercentage <= 80):
        return 'color-step-4';
      case (this.progressPercentage > 80 && this.progressPercentage < 100):
        return 'color-step-5';
      case (this.progressPercentage === 100):
        return 'color-full';
      default:
        return '';
    }
  }
  
  increment() {
    if (this.progressPercentage < this.maxProgress) {
      this.progressPercentage += this.percentageStep();
    }
  }
  
  decrement() {
    if (this.progressPercentage > 0) {
      this.progressPercentage -= this.percentageStep();
    }
  }
  
  handleTaskProgressChange(progress: number) {
    console.log(progress)
    this.progressPercentage = progress;

  }
}