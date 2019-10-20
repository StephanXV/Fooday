import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappaRistorantiPage } from './mappa-ristoranti.page';

describe('MappaRistorantiPage', () => {
  let component: MappaRistorantiPage;
  let fixture: ComponentFixture<MappaRistorantiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappaRistorantiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappaRistorantiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
