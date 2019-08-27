import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensionePage } from './recensione.page';

describe('RecensionePage', () => {
  let component: RecensionePage;
  let fixture: ComponentFixture<RecensionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecensionePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecensionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
