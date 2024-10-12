import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DaysOfTheWeek} from './days-of-the-week';

describe('ProgressSpinerComponent', () => {
	let component: DaysOfTheWeek;
	let fixture: ComponentFixture<DaysOfTheWeek>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DaysOfTheWeek]
		})
			.compileComponents();
		
		fixture = TestBed.createComponent(DaysOfTheWeek);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
