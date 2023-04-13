import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorOrderComponent } from './monitor-order.component';

describe('MonitorOrderComponent', () => {
  let component: MonitorOrderComponent;
  let fixture: ComponentFixture<MonitorOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
