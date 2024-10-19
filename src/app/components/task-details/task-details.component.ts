import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {
	MatAccordion,
	MatExpansionPanel,
	MatExpansionPanelDescription, MatExpansionPanelHeader,
	MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {EState, ITaskDTO} from "@/models/tasks.model";
import {DatePipe} from "@angular/common";

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
		DatePipe
	],
	templateUrl: './task-details.component.html',
	styleUrl: './task-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsComponent implements OnInit {
	readonly panelOpenState = signal(false);
	progressPercentage = 40; //TODO remove when task is implemented
	previousProgressPercentage = 0;
	taskPosibleStates !: EState[]
	@Input() task!: ITaskDTO;
	@Output() taskProgressChange = new EventEmitter<number>();
	
	constructor() {
		this.taskPosibleStates = Object.values(EState)
	}
	
	ngOnInit() {
		this.previousProgressPercentage = this.progressPercentage;
	}
	
	onStateChange(state: EState) {
		if (state === EState.DONE) {
			this.taskProgressChange.emit(100);
		} else {
			this.taskProgressChange.emit(this.previousProgressPercentage);
		}
	}
}
