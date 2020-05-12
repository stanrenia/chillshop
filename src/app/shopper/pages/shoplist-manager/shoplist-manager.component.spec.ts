import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ModalController, IonicModule } from '@ionic/angular';
import { ShoplistManagerComponent } from './shoplist-manager.component';
import { ShopListQuery } from '../../state/shoplist.query';
import { ShopListService } from '../../state/shoplist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppTitleService } from 'src/app/chill/services/app-title.service';
import { ShoplistCreationModalResult } from '../../components/shoplist-creation-modal/shoplist-creation-modal.component';
import { Template } from 'src/app/templates/state/template.model';

describe('ShoplistManagerComponent', () => {
  let modalCtrl: Partial<ModalController>;
  let modal: Partial<HTMLIonModalElement>;
  let shopListQuery: Partial<ShopListQuery>;
  let shopListService: Partial<ShopListService>;
  let router: Partial<Router>;
  let activatedRoute: Partial<ActivatedRoute>;
  let appTitleService: Partial<AppTitleService>;
  let component: ShoplistManagerComponent;
  let fixture: ComponentFixture<ShoplistManagerComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    modal = { present: jest.fn(), onWillDismiss: jest.fn() };
    modalCtrl = { create: jest.fn().mockReturnValue(modal) };
    shopListQuery = { getAllForUI: jest.fn() };
    shopListService = { createShopList: jest.fn() };
    appTitleService = { setTitle: jest.fn() };

    TestBed.configureTestingModule({
      declarations: [ShoplistManagerComponent],
      imports: [FormsModule, ReactiveFormsModule, IonicModule],
      providers: [
        { provide: ModalController, useValue: modalCtrl },
        { provide: ShopListQuery, useValue: shopListQuery },
        { provide: ShopListService, useValue: shopListService },
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: AppTitleService, useValue: appTitleService },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoplistManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal when fab button is clicked', fakeAsync(() => {
    // GIVEN
    const fabBtn = el.querySelector('ion-fab-button');
    (modal.onWillDismiss as jest.Mock).mockReturnValue(Promise.resolve({}));
    // WHEN
    fabBtn.click();
    tick();
    // THEN
    expect(modalCtrl.create).toHaveBeenCalled();
  }));

  it('should do nothing when creation modal is closed without data', fakeAsync(() => {
    // GIVEN
    (modal.onWillDismiss as jest.Mock).mockReturnValue(Promise.resolve({}));
    // WHEN
    component.showCreateForm();
    tick();
    // THEN
    expect(shopListService.createShopList).not.toHaveBeenCalled();
  }));

  it('should call create shoplist when creation modal is closed with data', fakeAsync(() => {
    // GIVEN
    const data: ShoplistCreationModalResult = {
      label: 'label',
      category: 'cat',
      dueDate: new Date(),
      selectedTemplate: { id: 1 } as Template,
    };
    (modal.onWillDismiss as jest.Mock).mockReturnValue(
      Promise.resolve({ data })
    );
    // WHEN
    component.showCreateForm();
    tick();
    // THEN
    expect(shopListService.createShopList).toHaveBeenCalledWith(
      data.label,
      data.category,
      data.selectedTemplate
    );
  }));
});
