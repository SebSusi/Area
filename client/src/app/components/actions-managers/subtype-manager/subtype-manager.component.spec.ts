import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtypeManagerComponent } from './subtype-manager.component';

describe('SubtypeManagerComponent', () => {
  let component: SubtypeManagerComponent;
  let fixture: ComponentFixture<SubtypeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtypeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtypeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
