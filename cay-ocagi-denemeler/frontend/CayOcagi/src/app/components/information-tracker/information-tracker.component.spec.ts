import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTrackerComponent } from './information-tracker.component';

describe('InformationTrackerComponent', () => {
  let component: InformationTrackerComponent;
  let fixture: ComponentFixture<InformationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
