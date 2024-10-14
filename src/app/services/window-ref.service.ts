import {Injectable} from '@angular/core';
import {fromEvent, Observable} from "rxjs";

@Injectable({
	providedIn: 'root',
})
export class WindowRefService {
	constructor() {
	}
	
	get nativeWindow(): Window | null {
		return typeof window !== 'undefined' ? window : null;
	}
	
	onResize(): Observable<Event> {
		return fromEvent(window, 'resize');
	}
}