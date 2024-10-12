import { Component } from "@angular/core";
import { TaskTableComponent } from "../tasks-table/tasks-table.component";
import {TaskFormComponent} from "@/components/task-form/task-form.component";
import {LoaderComponent} from "@/components/loader/loader.component";

@Component({
  selector: 'app-home',
  standalone: true,
	imports: [
		TaskTableComponent,
		TaskFormComponent,
		LoaderComponent
	],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() { }

}
