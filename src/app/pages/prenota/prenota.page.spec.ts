import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotaPage } from './prenota.page';

describe('PrenotaPage', () => {
  let component: PrenotaPage;
  let fixture: ComponentFixture<PrenotaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
