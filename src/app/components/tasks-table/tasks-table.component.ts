import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ETaskTableColumns, ITask } from "@/models/tasks.model";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatLine } from "@angular/material/core";
import { BottomSheetComponent } from "../bottom-sheet/bottom-sheet.component";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {Observable, of} from "rxjs";
import {TasksCrudService} from "@/services/tasks-crud.service";
import {InputButtonComponent} from "@/components/_inputs/input-button/input-button.component";
import {DateFormatPipe} from "@/pipes/date-format.pipe";
import {TaskFormComponent} from "@/components/task-form/task-form.component";
import {TaskDataService} from "@/services/task-data.service";

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
    InputButtonComponent,
    DateFormatPipe,
    TaskFormComponent,
    NgIf,
  ],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTableComponent implements OnInit{
  private cdr : ChangeDetectorRef = inject(ChangeDetectorRef);
  private _bottomSheet = inject(MatBottomSheet);
  private taskService: TaskDataService = inject(TaskDataService);
  private tasksCrud: TasksCrudService = inject(TasksCrudService);
  displayedColumns: ETaskTableColumns[] =
    [
    ETaskTableColumns.PRIORITY,
    ETaskTableColumns.TITLE,
    ETaskTableColumns.DEADLINE,
    ETaskTableColumns.STATE,
    ETaskTableColumns.ACTION
    ];
  tasks$ !: Observable<ITask[]>
  dataSource !: ITask[]
  updateTask: boolean = false;
  selectedTask: WritableSignal<ITask | null> = signal(null);
  @Output() _addTask = new EventEmitter<boolean>();
  @Output() _selectedTask = new EventEmitter<ITask>();
  
  constructor(){}
  
  ngOnInit(): void {
    this.tasks$ = this.tasksCrud.getCollectionData()
    this.tasks$.subscribe(
      (tasks: ITask[]) => {
        this.dataSource = tasks
        this.cdr.detectChanges()
      }
    )
  }

  onClickRow(task: ITask, update: boolean = false): Observable<ITask> | void{
    this.updateTask = update
    this.selectedTask.set(task)
    this.taskService.setTask(task)
    this._selectedTask.emit(task)
    
    if (update) {
      return of(task)
    }
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
            showAlert: true,
            handler: () => {
              return this.tasksCrud.deleteTask(element.id)
            }
          },
          {
            title: 'Editar',
            showAlert: false,
            handler: () => {
              return this.onClickRow(element, true)
            }
          }
        ],
        element,
      }
    });
  }
}
