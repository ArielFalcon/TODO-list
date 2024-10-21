import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
} from '@angular/core';
import {CustomInput} from '../custom-input'; // Importa la clase base
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
	selector: 'app-input-text',
	standalone: true,
	templateUrl: './input-text.component.html',
	styleUrls: ['./input-text.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputTextComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		FormsModule
	]
})
export class InputTextComponent extends CustomInput {
}