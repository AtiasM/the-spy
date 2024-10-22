import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRolesComponent } from './display-roles.component';

describe('DisplayRolesComponent', () => {
  let component: DisplayRolesComponent;
  let fixture: ComponentFixture<DisplayRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayRolesComponent]
    });
    fixture = TestBed.createComponent(DisplayRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
