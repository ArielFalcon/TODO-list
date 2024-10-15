import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatMiniFabButton} from "@angular/material/button";

@Component({
  selector: 'app-task-progress',
  standalone: true,
  imports: [
    MatIcon,
    NgClass,
    MatMiniFabButton
  ],
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.scss']
})
export class TaskProgressComponent {
  progressPercentage = 0;
  maxProgress = 100;
  progressStep = 10;
  
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
    if (this.progressPercentage <= 20) return 'color-step-1';
    if (this.progressPercentage > 20 && this.progressPercentage <= 40) return 'color-step-2';
    if (this.progressPercentage > 40 && this.progressPercentage <= 60) return 'color-step-3';
    if (this.progressPercentage > 60 && this.progressPercentage <= 80) return 'color-step-4';
    if (this.progressPercentage > 80 && this.progressPercentage < 100) return 'color-step-5';
    if (this.progressPercentage === 100) return 'color-full';
    return '';
  }
}