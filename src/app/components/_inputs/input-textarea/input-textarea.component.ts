import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {CustomInput} from "@/components/_inputs/custom-input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
	selector: 'app-input-textarea',
	standalone: true,
	imports: [],
	templateUrl: './input-textarea.component.html',
	styleUrl: './input-textarea.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputTextareaComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextareaComponent extends CustomInput {

}
