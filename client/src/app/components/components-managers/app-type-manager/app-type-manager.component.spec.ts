import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTypeManagerComponent } from './app-type-manager.component';

describe('AppTypeManagerComponent', () => {
  let component: AppTypeManagerComponent;
  let fixture: ComponentFixture<AppTypeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTypeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTypeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
