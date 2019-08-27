import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePage } from './google.page';

describe('GooglePage', () => {
  let component: GooglePage;
  let fixture: ComponentFixture<GooglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
