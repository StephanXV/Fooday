import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltriPage } from './filtri.page';

describe('FiltriPage', () => {
  let component: FiltriPage;
  let fixture: ComponentFixture<FiltriPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltriPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
