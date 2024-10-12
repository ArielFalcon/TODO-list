import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertComponent} from "@/components/alert/alert.component";

@Injectable({
  providedIn: 'root'
})
export class ShowAlertService {
  private _snackBar = inject(MatSnackBar);
  durationInMs = 5;
  
  constructor() {}
  
  showAlert(message: string, durationInMs: number = this.durationInMs) {
    this._snackBar.openFromComponent(AlertComponent, {
      data: message,
      duration: durationInMs * 1000,
    });
  }
}
