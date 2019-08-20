import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferitiPage } from './preferiti.page';

describe('PreferitiPage', () => {
  let component: PreferitiPage;
  let fixture: ComponentFixture<PreferitiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferitiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferitiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
