import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIncidentsComponent } from './list-incidents.component';

describe('ListIncidentsComponent', () => {
  let component: ListIncidentsComponent;
  let fixture: ComponentFixture<ListIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
