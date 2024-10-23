import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "@/components/_inputs/custom-input";

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true,
    },
  ],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRadioComponent extends CustomInput {

}
