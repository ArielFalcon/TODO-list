import { Component } from "@angular/core";
import { TaskTableComponent } from "../tasks-table/tasks-table.component";
import {TaskFormComponent} from "@/components/task-form/task-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
	imports: [
		TaskTableComponent,
		TaskFormComponent,
	],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() { }

}
