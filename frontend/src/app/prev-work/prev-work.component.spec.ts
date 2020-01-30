import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevWorkComponent } from './prev-work.component';

describe('PrevWorkComponent', () => {
  let component: PrevWorkComponent;
  let fixture: ComponentFixture<PrevWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
