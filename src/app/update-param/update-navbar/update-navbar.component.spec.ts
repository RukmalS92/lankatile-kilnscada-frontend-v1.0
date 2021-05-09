import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNavbarComponent } from './update-navbar.component';

describe('UpdateNavbarComponent', () => {
  let component: UpdateNavbarComponent;
  let fixture: ComponentFixture<UpdateNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
