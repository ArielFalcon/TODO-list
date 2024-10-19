import {ControlValueAccessor} from '@angular/forms';
import {Directive, ElementRef, HostListener, ViewChild} from '@angular/core';

// Base class for custom inputs with ngForm API support
@Directive()
export class CustomInput implements ControlValueAccessor {
	private onChange: (value: string) => void = () => {
	};
	private onTouched: () => void = () => {
	};
	value: string = '';
	@ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
	
	// Ensure the value is updated when the input is initialized
	writeValue(value: any): void {
		this.value = value;
		if (this.inputElement) {
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
		console.log('Input value:', this.value);
	}
	
	@HostListener('blur') onBlur() {
		this.onTouched();
	}
}