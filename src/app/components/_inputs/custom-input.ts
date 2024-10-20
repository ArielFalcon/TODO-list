import {ControlValueAccessor} from '@angular/forms';
import {
	AfterViewInit,
	Directive,
	ElementRef,
	HostListener, Input,
	ViewChild
} from '@angular/core';

/*
  Base class for custom input components.
  Ensure that the HTML template of every component that extends CustomInput includes the #inputElement.
  This implementation is necessary for binding and functionality to work correctly.
 */
@Directive()
export class CustomInput implements ControlValueAccessor, AfterViewInit {
	private onChange: (value: string) => void = () => {
	};
	private onTouched: () => void = () => {
	};
	value: string | null = null;
	@Input() title: string = '';
	@ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
	
	ngAfterViewInit(): void {
		// Ensure that the inputElement is defined
		if (!this.inputElement) {
			throw new Error('Input element not found. Ensure that the input has a template reference variable #inputElement');
		}
	}
	
	// Ensure the value is updated when the input is initialized
	writeValue(value: any): void {
		this.value = value;
		if (this.inputElement && this.value) {
			this.inputElement.nativeElement.value = this.value;
			//Updates the input value in the DOM
		}
	}
	
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
	
	onInputChange(): void {
		this.value = this.inputElement.nativeElement.value;
		this.onChange(this.value);
	}
	
	@HostListener('blur') onBlur() {
		this.onTouched();
	}
}