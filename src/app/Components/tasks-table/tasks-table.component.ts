import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EState, ETaskTableColumns, ITask } from "@/Models/tasks.model";
import { DatePipe } from "@angular/common";
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatLine } from "@angular/material/core";
import { BottomSheetComponent } from "@/Components/bottom-sheet/bottom-sheet.component";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

const ELEMENT_DATA: ITask[] = [
  { id: '1', priority: 4, title: 'Task 1', description: 'Description 1', deadline: new Date(), state: EState.PENDANT },
  { id: '2', priority: 1, title: 'Task 2', description: 'Description 2', deadline: new Date(), state: EState.IN_PROGRESS },
  { id: '3', priority: 2, title: 'Task 3', description: 'Description 3', deadline: new Date(), state: EState.DONE },
];

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
  ],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TaskTableComponent {
  constructor() { }

  displayedColumns: ETaskTableColumns[] = [ETaskTableColumns.PRIORITY, ETaskTableColumns.TITLE, ETaskTableColumns.DEADLINE, ETaskTableColumns.STATE, ETaskTableColumns.ACTION];
  dataSource: ITask[] = ELEMENT_DATA;
  selectedTask: WritableSignal<ITask | null> = signal(null);
  private _bottomSheet = inject(MatBottomSheet);

  onClickRow(row: ITask): void {
    this.selectedTask.set(row)
  }

  openBottomSheet(element: ITask, $event: MouseEvent): void {
    $event.stopPropagation();
    console.log('Open bottom sheet: ', element);
    this._bottomSheet.open(BottomSheetComponent, {
      data: {
        actions: [
          {
            title: 'Borrar',
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
