import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatButton,
    MatSnackBarAction
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  snackBarRef = inject(MatSnackBarRef);
  
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
}
