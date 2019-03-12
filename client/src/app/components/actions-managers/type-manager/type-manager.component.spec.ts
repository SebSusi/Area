import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeManagerComponent } from './type-manager.component';

describe('TypeManagerComponent', () => {
  let component: TypeManagerComponent;
  let fixture: ComponentFixture<TypeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
