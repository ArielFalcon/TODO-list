import {Component, Inject, inject} from '@angular/core';
import {MatLine} from "@angular/material/core";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

export interface IInputData {
  actions: {
    title: string;
  }[],
  element: {
    id: string | number;
    [key: string]: unknown;
  };
}

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [
    MatLine,
    MatListItem,
    MatNavList
  ],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss'
})
export class BottomSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IInputData
  ) {}
  
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetComponent>>(MatBottomSheetRef);
  
  handleClick($event: MouseEvent, id: string | number): void {
    console.log('Button clicked: ', $event);
    console.log('Element id: ', id);
    
    this._bottomSheetRef.dismiss();
    $event.preventDefault();
  }
}
