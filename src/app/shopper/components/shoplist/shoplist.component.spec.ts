import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistComponent } from './shoplist.component';

describe('ShoplistComponent', () => {
  let component: ShoplistComponent;
  let fixture: ComponentFixture<ShoplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoplistComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
