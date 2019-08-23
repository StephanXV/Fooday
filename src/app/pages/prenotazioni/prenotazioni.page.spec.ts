import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioniPage } from './prenotazioni.page';

describe('PrenotazioniPage', () => {
  let component: PrenotazioniPage;
  let fixture: ComponentFixture<PrenotazioniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotazioniPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
