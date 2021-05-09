import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VfdComponent } from './vfd.component';

describe('VfdComponent', () => {
  let component: VfdComponent;
  let fixture: ComponentFixture<VfdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VfdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
