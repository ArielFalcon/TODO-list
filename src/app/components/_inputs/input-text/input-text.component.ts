import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
} from '@angular/core';
import {CustomInput} from '../custom-input'; // Importa la clase base
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
	selector: 'app-input-text',
	templateUrl: './input-text.component.html',
	styleUrls: ['./input-text.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputTextComponent),
			multi: true,
		},
	],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends CustomInput {
}