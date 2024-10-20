import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatetimeComponent } from './input-datetime.component';

describe('InputTimeComponent', () => {
  let component: InputDatetimeComponent;
  let fixture: ComponentFixture<InputDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDatetimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
