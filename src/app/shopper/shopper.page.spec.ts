import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopperPage } from './shopper.page';

describe('ShopperPage', () => {
  let component: ShopperPage;
  let fixture: ComponentFixture<ShopperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopperPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
