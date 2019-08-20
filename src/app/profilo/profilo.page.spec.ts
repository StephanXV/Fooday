import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloPage } from './profilo.page';

describe('ProfiloPage', () => {
  let component: ProfiloPage;
  let fixture: ComponentFixture<ProfiloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiloPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
