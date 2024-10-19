import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgClass} from "@angular/common";
import {MatMiniFabButton} from "@angular/material/button";
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
    TaskDetailsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.scss']
})
export class TaskProgressComponent implements OnInit{
  previousProgressPercentage = 0;
  progressPercentage = 40;
  maxProgress = 100;
  progressStep = 20;
  @Input() task!: ITaskDTO;
  
  constructor() {
  }
  
  ngOnInit() {
    this.previousProgressPercentage = this.progressPercentage;
  }
  
  increment() {
    if (this.progressPercentage < this.maxProgress) {
      this.progressPercentage += this.progressStep;
    }
  }
  
  decrement() {
    if (this.progressPercentage > 0) {
      this.progressPercentage -= this.progressStep;
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
  
  handleTaskProgressChange(progress: number) {
    this.progressPercentage = progress;
  }
}