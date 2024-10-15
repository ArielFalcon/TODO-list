import { Component } from "@angular/core";
import { TaskTableComponent } from "@/components/tasks-table/tasks-table.component";
import { TaskFormComponent } from "@/components/task-form/task-form.component";
import { LoaderComponent } from "@/components/loader/loader.component";
import { DaysOfTheWeek } from "@/components/days-of-the-week/days-of-the-week";
import { TaskProgressComponent } from "@/components/task-progress/task-progress.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TaskTableComponent,
    TaskFormComponent,
    LoaderComponent,
    DaysOfTheWeek,
    TaskProgressComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showAddTaaskForm: boolean = false;

  constructor() { }

  toggleAddTaskForm() {
    this.showAddTaaskForm = !this.showAddTaaskForm;
  }

}
