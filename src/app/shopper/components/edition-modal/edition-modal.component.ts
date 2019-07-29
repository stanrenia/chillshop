import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ShopListQuery, ShopListItemUI } from '../../state/shoplist.query';
import { map, tap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ShopListService } from '../../state/shoplist.service';
import { ID } from '@datorama/akita/src';
import { ProductCategory } from '../../state/product-category.state';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edition-modal',
  templateUrl: './edition-modal.component.html',
  styleUrls: ['./edition-modal.component.scss'],
})
export class EditionModalComponent {

  itemForm: FormGroup;
  item: ShopListItemUI;
  shoplistId: ID;
  categories: ProductCategory[] = [];

  constructor(
    private fb: FormBuilder,
    private navParams: NavParams, 
    private shoplistQuery: ShopListQuery, 
    private modalCtrl: ModalController,
    private shoplistService: ShopListService) {
      this.createForm();
  }

  ionViewWillEnter() {
    const { shoplistId, itemId } = this.navParams.data.edition;
    this.shoplistId = shoplistId;

    this.shoplistQuery.getItemsByShopListId(shoplistId).pipe(
      map(items => items.find(i => i.id === itemId)),
      tap(item => {
        this.item = item;
        this.patchForm(item);
      })
    ).subscribe();

    this.shoplistQuery.selectVisibleProductCategories().pipe(
      tap(categories => {
        this.categories = categories;
      })
    ).subscribe();

    this.setFormObservables();
  }

  save() {
    const { productName, quantity, productCategoryName } = this.itemForm.value;
    const item: Partial<ShopListItemUI> = { productName, quantity, productCategoryName };
    this.shoplistService.updateItem(this.shoplistId, this.item.id, item);

    this.modalCtrl.dismiss();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
  
  selectCategory(categoryName) {
    this.itemForm.patchValue({
      productCategoryName: categoryName
    }, { emitEvent: false });
    this.shoplistService.setCategoryFilter(null);
  }

  private setFormObservables() {
    this.itemForm.get('productCategoryName').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      tap(categoryName => {
        this.shoplistService.setCategoryFilter(categoryName);
      })
    ).subscribe();
  }

  private createForm(): void {
    this.itemForm = this.fb.group({
      productName: [null],
      productCategoryName: [null],
      quantity: [1]
    })
  }

  private patchForm(item: ShopListItemUI) {
    if (item) {
      const nextFormValue = Object.keys(item).filter(key => item.hasOwnProperty(key)).reduce((acc, key) => {
        acc[key] = item[key];
        return acc;
      }, {});
  
      this.itemForm.patchValue(nextFormValue);
    }
  }
}
