import {Component, signal, WritableSignal} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {EState, ETaskTableColumns, ITask} from "@/Models/tasks.model";
import {DatePipe} from "@angular/common";

const ELEMENT_DATA: ITask[] = [
  {id: '1', priority: 4, title: 'Task 1', description: 'Description 1', deadline: new Date(), state: EState.PENDANT},
  {id: '2', priority: 1, title: 'Task 2', description: 'Description 2', deadline: new Date(), state: EState.IN_PROGRESS},
  {id: '3', priority: 2, title: 'Task 3', description: 'Description 3', deadline: new Date(), state: EState.DONE},
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() {}
  
  displayedColumns: ETaskTableColumns[] = [ETaskTableColumns.PRIORITY, ETaskTableColumns.TITLE, ETaskTableColumns.DEADLINE, ETaskTableColumns.STATE];
  dataSource: ITask[] = ELEMENT_DATA;
  selectedTask: WritableSignal <ITask|null> = signal(null);
  
  onClickRow(row: any) {
    console.log(row)
    this.selectedTask.set(row)
  }
}
