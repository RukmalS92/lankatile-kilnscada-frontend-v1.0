import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorynavbarComponent } from './historynavbar.component';

describe('HistorynavbarComponent', () => {
  let component: HistorynavbarComponent;
  let fixture: ComponentFixture<HistorynavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorynavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorynavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
