import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'app-input-text',
	standalone: true,
	imports: [],
	templateUrl: './input-text.component.html',
	styleUrl: './input-text.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent {

}
