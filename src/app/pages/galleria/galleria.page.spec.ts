import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriaPage } from './galleria.page';

describe('GalleriaPage', () => {
  let component: GalleriaPage;
  let fixture: ComponentFixture<GalleriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
