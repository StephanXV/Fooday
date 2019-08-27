import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazionePage } from './registrazione.page';

describe('RegistrazionePage', () => {
  let component: RegistrazionePage;
  let fixture: ComponentFixture<RegistrazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrazionePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
