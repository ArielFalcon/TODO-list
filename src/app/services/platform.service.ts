import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private resizeSubject = new Subject<number>();
  public resize$ = this.resizeSubject.asObservable().pipe(debounceTime(300));
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser()) {
      window.addEventListener('resize', () => this.onResize());
    }
  }
  
  private onResize() {
    this.resizeSubject.next(this.windowWidth);
  }
  
  public isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  
  get windowWidth(): number {
    return this.isBrowser() ? window.innerWidth : 0
  }
}