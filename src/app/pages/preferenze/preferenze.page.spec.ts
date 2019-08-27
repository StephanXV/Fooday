import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenzePage } from './preferenze.page';

describe('PreferenzePage', () => {
  let component: PreferenzePage;
  let fixture: ComponentFixture<PreferenzePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenzePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenzePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
