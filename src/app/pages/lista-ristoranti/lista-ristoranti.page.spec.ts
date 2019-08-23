import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRistorantiPage } from './lista-ristoranti.page';

describe('ListaRistorantiPage', () => {
  let component: ListaRistorantiPage;
  let fixture: ComponentFixture<ListaRistorantiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRistorantiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRistorantiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
