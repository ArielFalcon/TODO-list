import { Component } from "@angular/core";
import { TaskTableComponent } from "@/components/tasks-table/tasks-table.component";
import { TaskFormComponent } from "@/components/task-form/task-form.component";
import { LoaderComponent } from "@/components/loader/loader.component";
import { DaysOfTheWeek } from "@/components/days-of-the-week/days-of-the-week";
import { TaskProgressComponent } from "@/components/task-progress/task-progress.component";
import {ITaskDTO} from "@/models/tasks.model";
import {InputButtonComponent} from "@/components/_inputs/input-button/input-button.component";
import {InputTextComponent} from "@/components/_inputs/input-text/input-text.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
	imports: [
		TaskTableComponent,
		TaskFormComponent,
		LoaderComponent,
		DaysOfTheWeek,
		TaskProgressComponent,
		InputButtonComponent,
		InputTextComponent,
		FormsModule,
	],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
	showAddTaskForm: boolean = true;
  selectedTask?: ITaskDTO;

  toggleAddTaskForm() {
	  this.showAddTaskForm = !this.showAddTaskForm;
  }
  
  onTaskSelected(task: ITaskDTO) {
    this.selectedTask = task;
    console.log('Task selected:', task);
  }
	
	handleTestInputChange(event: Event) {
		console.log('Test input change:', event);
	}
}
