import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-input-button',
	standalone: true,
	imports: [
		NgIf
	],
	templateUrl: './input-button.component.html',
	styleUrl: './input-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputButtonComponent {
	@Input() text?: string;
	@Input() action?: () => unknown;
	
	constructor() {
	}
}
