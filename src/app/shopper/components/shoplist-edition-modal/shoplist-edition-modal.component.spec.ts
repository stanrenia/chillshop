import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistEditionModalComponent } from './shoplist-edition-modal.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ModalController, NavParams, IonicModule } from '@ionic/angular';
import { ShoplistCategoryQuery } from '../../state/shoplist-category.query';
import { ShoplistCategoryService } from '../../state/shoplist-category.service';

describe('ShoplistEditionModalComponent', () => {
  let component: ShoplistEditionModalComponent;
  let fixture: ComponentFixture<ShoplistEditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoplistEditionModalComponent ],
      imports: [FormsModule, ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: {} },
        { provide: NavParams, useValue: {} },
        { provide: ShoplistCategoryQuery, useValue: { selectVisibleCategories: jest.fn() } },
        { provide: ShoplistCategoryService, useValue: {} },
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoplistEditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
