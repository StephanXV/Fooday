import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModProfiloPage } from './mod-profilo.page';

describe('ModProfiloPage', () => {
  let component: ModProfiloPage;
  let fixture: ComponentFixture<ModProfiloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModProfiloPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModProfiloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
