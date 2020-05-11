import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistCreationModalComponent } from './shoplist-creation-modal.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ModalController, NavParams, IonicModule } from '@ionic/angular';

describe('ShoplistCreationModalComponent', () => {
  let modalCtrl: Partial<ModalController>;
  let navParams: Partial<NavParams>;
  let component: ShoplistCreationModalComponent;
  let fixture: ComponentFixture<ShoplistCreationModalComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    modalCtrl = { dismiss: jest.fn() };

    navParams = { data: {} };

    TestBed.configureTestingModule({
      declarations: [ ShoplistCreationModalComponent ],
      imports: [FormsModule, ReactiveFormsModule, IonicModule],
      providers: [
        { provide: ModalController, useValue: modalCtrl },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoplistCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss modal without data close is clicked', () => {
    // GIVEN
    const closeBtn = el.querySelectorAll('ion-button')[0];
    // WHEN
    closeBtn.click();
    // THEN
    expect(modalCtrl.dismiss).toHaveBeenCalledWith();
  });

  it('should dismiss modal with data when create is clicked', () => {
    // GIVEN
    const createBtn = el.querySelectorAll('ion-button')[1];
    const formValue = {
      label: 'AAA',
      category: null,
      dueDate: null,
      selectedTemplate: null
    };
    component.shopListForm.setValue(formValue);
    // WHEN
    createBtn.click();
    // THEN
    expect(modalCtrl.dismiss).toHaveBeenCalledWith(formValue);
  });


});
