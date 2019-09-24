import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistItemGroupComponent } from './shoplist-item-group.component';

describe('ShoplistItemGroupComponent', () => {
  let component: ShoplistItemGroupComponent;
  let fixture: ComponentFixture<ShoplistItemGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoplistItemGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoplistItemGroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.itemGroup = {
      categoryId: 1,
      categoryName: 'Cat',
      checkedCount: 2,
      hideItems: false,
      items: []
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
