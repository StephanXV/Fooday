import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaPage } from './ricerca.page';

describe('RicercaPage', () => {
  let component: RicercaPage;
  let fixture: ComponentFixture<RicercaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
