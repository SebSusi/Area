import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerManagerComponent } from './trigger-manager.component';

describe('TriggerManagerComponent', () => {
  let component: TriggerManagerComponent;
  let fixture: ComponentFixture<TriggerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
