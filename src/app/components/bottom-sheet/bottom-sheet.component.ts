import {Component, Inject, inject} from '@angular/core';
import {MatLine} from "@angular/material/core";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Observable} from "rxjs";
import {ShowAlertService} from "@/services/show-alert.service";

export interface IInputData {
  actions: IAction[],
  element: {
    id: string;
    [key: string]: unknown; //Other properties
  };
}

interface IAction {
  title: string;
  handler?: (param: unknown) => Observable<unknown>;
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
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetComponent>>(MatBottomSheetRef);
  private alertService = inject(ShowAlertService);
  
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IInputData
  ) {}

  handleClick($event: MouseEvent, element: IAction): void {
    if (element.handler) {
      console.log(element)
      element.handler(this.data.element.id).subscribe(
        () => {
          this.alertService.showAlert("Hecho!");
        },
        (error: Error) => {
          this.alertService.showAlert(error.message);
        }
      );
    }
    
    this._bottomSheetRef.dismiss();
    $event.preventDefault();
  }
}
