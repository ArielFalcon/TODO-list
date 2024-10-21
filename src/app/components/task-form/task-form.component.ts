import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	inject,
	Input,
	OnDestroy,
	OnInit,
	Output
} from '@angular/core';
import {TasksCrudService} from "@/services/tasks-crud.service";
import {EState, ITask, ITaskDTO} from "@/models/tasks.model";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ShowAlertService} from "@/services/show-alert.service";
import {MatIcon} from "@angular/material/icon";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {InputTextComponent} from "@/components/_inputs/input-text/input-text.component";
import {InputTextareaComponent} from "@/components/_inputs/input-textarea/input-textarea.component";
import {InputDatetimeComponent} from "@/components/_inputs/input-datetime/input-datetime.component";
import {DateTime} from "luxon";
import {Observable, Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-task-form',
  standalone: true,
	imports: [
		MatButton,
		ReactiveFormsModule,
		MatInput,
		MatSelect,
		MatOption,
		MatDatepickerModule,
		MatInputModule,
		MatFormFieldModule,
		MatIcon,
		MatButtonToggleGroup,
		MatButtonToggle,
		InputTextComponent,
		InputTextareaComponent,
		InputDatetimeComponent,
	],
	providers: [
		provideNativeDateAdapter(),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit, OnDestroy{
  public taskForm!: FormGroup;
  readonly taskState = Object.values(EState);
	private tasksCrud = inject(TasksCrudService);
	private formBuilder = inject(FormBuilder);
	private alertService = inject(ShowAlertService);
	private destroy$ = new Subject<void>();
	@Output() _closed = new EventEmitter<boolean>();
	@Input() task: ITask | null = null;
  
	get taskDTO(): ITaskDTO {
		return {
			title: this.taskForm.get('title')?.value,
			description: this.taskForm.get('description')?.value,
			priority: this.taskForm.get('priority')?.value,
			deadline: this.taskForm.get('deadline')?.value,
			state: this.taskForm.get('state')?.value,
			goal: 0,
			goalMetric: null,
			frequency: null, /*TODO recibir datos*/
		}
	}
	
  ngOnInit(): void {
		if (this.task) {
			const deadline = this.task.deadline ? DateTime.fromISO(this.task.deadline) : '';
			console.log('tarea input: ',this.task);
			this.taskForm = this.formBuilder.group({
				title: [this.task.title, [Validators.required]],
				description: [this.task.description],
				priority: [this.task.priority],
				deadline: [deadline, [Validators.required]],
				state: [this.task.state, [Validators.required]],
			})
		} else {
			this.taskForm = this.formBuilder.group({
				title: [null, [Validators.required]],
				description: [null],
				priority: [1],
				deadline: ['', [Validators.required]],
				state: [EState.PENDANT, [Validators.required]],
			})
		}
  }
	
	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
	
  
  onSubmit() {
		let res: Observable<unknown> | undefined;
		if (this.task) {
			res =this.updateTask();
		} else {
		res =	this.addTask();
		}
		
		res?.pipe(takeUntil(this.destroy$))
			.subscribe(
				() => {
					this.alertService.showAlert(this.task ? 'Tarea actualizada' : 'Tarea creada');
					this.taskForm.reset();
					this._closed.emit(true);
				},
				(error: Error) => {
					this.alertService.showAlert(error.message);
				}
			);
  }
	
	addTask() {
		return this.tasksCrud.addTask(this.taskDTO)
	}
	
	updateTask() {
		if (!this.task) {
			return;
		}
		console.log('taskDTO: ', this.taskDTO);
		return this.tasksCrud.updateTask(this.task.id, this.taskDTO)
	}
	
	closeForm() {
		this._closed.emit(true);
	}
}
