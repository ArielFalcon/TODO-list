import {Component, EventEmitter, inject, OnInit, Output, signal, WritableSignal} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ETaskTableColumns, ITask } from "@/models/tasks.model";
import {AsyncPipe, DatePipe} from "@angular/common";
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatLine } from "@angular/material/core";
import { BottomSheetComponent } from "../bottom-sheet/bottom-sheet.component";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {Observable} from "rxjs";
import {TasksCrudService} from "@/services/tasks-crud.service";

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatBottomSheetModule,
    MatNavList,
    MatListItem,
    MatLine,
    MatButton,
    MatMiniFabButton,
    MatIcon,
    AsyncPipe,
  ],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TaskTableComponent implements OnInit{
  tasks$ !: Observable<ITask[]>
  displayedColumns: ETaskTableColumns[] = [ETaskTableColumns.PRIORITY, ETaskTableColumns.TITLE, ETaskTableColumns.DEADLINE, ETaskTableColumns.STATE, ETaskTableColumns.ACTION];
  dataSource !: ITask[]
  selectedTask: WritableSignal<ITask | null> = signal(null);
  private _bottomSheet = inject(MatBottomSheet);
  @Output() _addTask = new EventEmitter<boolean>();
  @Output() _selectedTask = new EventEmitter<ITask>();
  
  constructor(private tasksCrud:TasksCrudService){}
  
  ngOnInit(): void {
    this.tasks$ = this.tasksCrud.getCollectionData()
    this.tasks$.subscribe(
      (tasks: ITask[]) => {
        this.dataSource = tasks
      }
    )
  }

  onClickRow(row: ITask): void {
    this.selectedTask.set(row)
    this._selectedTask.emit(row)
  }
  
  onAddTaskClick(): void {
    this._addTask.emit(true)
  }

  openBottomSheet(element: ITask, $event: MouseEvent): void {
    $event.stopPropagation();
    this._bottomSheet.open(BottomSheetComponent, {
      data: {
        actions: [
          {
            title: 'Borrar',
            handler: () => {
              return this.tasksCrud.deleteTask(element.id)
            }
          },
          {
            title: 'Editar',
          }
        ],
        element,
      }
    });
  }
}
