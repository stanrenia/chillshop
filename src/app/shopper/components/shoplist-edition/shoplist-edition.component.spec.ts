import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistEditionComponent } from './shoplist-edition.component';
import { ShopListQuery } from '../../state/shoplist.query';
import { ShopListService } from '../../state/shoplist.service';
import { FormBuilder } from '@angular/forms';
import { AppTitleService } from '../../services/app-title.service';
import { ActivatedRoute } from '@angular/router';
import { ProductQuery } from '../../state/product.query';
import { ProductService } from '../../state/product.service';
import { ModalController, ToastController } from '@ionic/angular';

describe('ShoplistEditionComponent', () => {
  let component: ShoplistEditionComponent;
  let fixture: ComponentFixture<ShoplistEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoplistEditionComponent ],
      providers: [
        {provide: ShopListQuery },
    {provide: ShopListService },
    {provide: FormBuilder },
    {provide: AppTitleService },
    {provide: ActivatedRoute },
    {provide: ProductQuery },
    {provide: ProductService },
    {provide: ModalController },
    {provide: ToastController },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoplistEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
