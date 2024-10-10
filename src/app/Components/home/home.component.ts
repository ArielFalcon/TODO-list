import { Component } from "@angular/core";
import { TaskTableComponent } from "../tasks-table/tasks-table.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TaskTableComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() { }

}
