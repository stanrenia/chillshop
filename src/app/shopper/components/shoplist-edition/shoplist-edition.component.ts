import { Component } from '@angular/core';
import { ShopListQuery } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { ShopListItem } from '../../state/shoplist.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopListService } from '../../state/shoplist.service';
import { AppTitleService } from '../../services/app-title.service';

@Component({
  selector: 'app-shoplist-edition',
  templateUrl: './shoplist-edition.component.html',
  styleUrls: ['./shoplist-edition.component.scss'],
})
export class ShoplistEditionComponent {

  items$: Observable<ShopListItem[]>;

  shopListForm: FormGroup;

  constructor(
    private query: ShopListQuery,
    private service: ShopListService,
    private fb: FormBuilder,
    private appTitleService: AppTitleService
  ) {
    this.makeForm();
  }

  makeForm(): any {
    this.shopListForm = this.fb.group({
      label: ['', Validators.required],
      category: [undefined]
    });
  }

  ionViewWillEnter() {
    const shopListId = 1;
    this.items$ = this.query.getItemsByShopListId(shopListId);
    this.appTitleService.setTitle(`Shopper - Edition ${shopListId}`);
  }

  createShopList(formValue) {
    if (!this.shopListForm.valid) {
      return;
    }

    this.service.createShopList(formValue.label, null);
    this.shopListForm.patchValue({ label: '' });
  }

}
