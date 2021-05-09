import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimvalueComponent } from './timvalue.component';

describe('TimvalueComponent', () => {
  let component: TimvalueComponent;
  let fixture: ComponentFixture<TimvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
