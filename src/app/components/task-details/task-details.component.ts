import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {
	MatAccordion,
	MatExpansionPanel,
	MatExpansionPanelDescription,
	MatExpansionPanelHeader,
	MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {EState, ITaskDTO} from "@/models/tasks.model";
import {DatePipe} from "@angular/common";
import {DateFormatPipe} from "@/pipes/date-format.pipe";

@Component({
	selector: 'app-task-details',
	standalone: true,
	imports: [
		MatAccordion,
		MatExpansionPanel,
		MatExpansionPanelHeader,
		MatExpansionPanelDescription,
		MatExpansionPanelTitle,
		MatButtonToggleGroup,
		MatButtonToggle,
		DatePipe,
		DateFormatPipe
	],
	templateUrl: './task-details.component.html',
	styleUrl: './task-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsComponent implements OnInit {
	readonly panelOpenState = signal(false);
  @Input()  	previousProgressPercentage = 0;
	taskPosibleStates !: EState[]
	@Input() task!: ITaskDTO;
	@Output() taskProgressChange = new EventEmitter<number>();
	
	constructor() {
		this.taskPosibleStates = Object.values(EState)
	}
	
	ngOnInit() {
		this.previousProgressPercentage = this.task.percentage;
		console.log('Task:', this.task);
	}
	
	onStateChange(state: EState) {
		if (state === EState.DONE) {
			this.taskProgressChange.emit(100);
		} else if (state === EState.PENDANT) {
			this.taskProgressChange.emit(0);
		}
		else {
			this.taskProgressChange.emit(this.previousProgressPercentage);
		}
	}
	
}
