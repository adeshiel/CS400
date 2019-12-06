import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeachFormComponent } from './seach-form.component';

describe('SeachFormComponent', () => {
  let component: SeachFormComponent;
  let fixture: ComponentFixture<SeachFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeachFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
