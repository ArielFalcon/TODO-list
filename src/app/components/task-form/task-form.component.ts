import {Component, ElementRef, EventEmitter, HostListener, inject, OnInit, Output} from '@angular/core';
import {TasksCrudService} from "@/services/tasks-crud.service";
import {EState, ITaskDTO} from "@/models/tasks.model";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import moment from "moment";
import {Timestamp} from "firebase/firestore";
import {ShowAlertService} from "@/services/show-alert.service";


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
	],
	providers: [
		provideNativeDateAdapter(),
	],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit{
  public taskForm!: FormGroup;
  readonly taskState = Object.values(EState);
	private tasksCrud = inject(TasksCrudService);
	private formBuilder = inject(FormBuilder);
	private alertService = inject(ShowAlertService);
	@Output() _closed = new EventEmitter<boolean>();
	
	constructor(
		private elementRef: ElementRef,
	) {
	}
  
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      priority: [1],
      deadline: [this.tomorrowDate, [Validators.required]],
	    timeLimit: ['00:00'],
      state: [EState.PENDANT, [Validators.required]],
    })
  }
	
	@HostListener('document:click', ['$event'])
	onClickOutside(event: MouseEvent) {
		const clickedInside = this.elementRef.nativeElement.contains(event.target);
		if (!clickedInside) {
			this._closed.emit(true);
		}
	}
  
  get tomorrowDate() {
		return moment().add(1, 'days').format('YYYY-MM-DD')
  }
	
	get formatDeadline(): Date {
		const day = moment(this.taskForm.get('deadline')?.value).format("YYYY-MM-DD")
		const time = this.taskForm.get('timeLimit')?.value
		return new Date(`${day}T${time}`)
	}
	
	get taskDTO(): ITaskDTO {
		return {
			title: this.taskForm.get('title')?.value,
			description: this.taskForm.get('description')?.value,
			priority: this.taskForm.get('priority')?.value,
			deadline: this.formatDeadline as unknown as Timestamp,
			state: this.taskForm.get('state')?.value,
		}
	}
  
  onSubmit() {
    this.tasksCrud.addTask(this.taskDTO).subscribe(
      () => {
	      this.alertService.showAlert('Tarea añadida');
	      this.taskForm.reset();
	      this._closed.emit(true);
      },
	      (error: Error) => {
					this.alertService.showAlert(error.message)
			}
    )
  }
}
