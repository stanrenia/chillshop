import { Component } from '@angular/core';
import { ShopListQuery } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { ShopListItem } from '../../state/shoplist.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopListService } from '../../state/shoplist.service';
import { AppTitleService } from '../../services/app-title.service';
import { ActivatedRoute } from '@angular/router';
import { ID } from '@datorama/akita';
import { ProductUI } from '../../state/product.state';
import { ProductQuery } from '../../state/product.query';

@Component({
  selector: 'app-shoplist-edition',
  templateUrl: './shoplist-edition.component.html',
  styleUrls: ['./shoplist-edition.component.scss'],
})
export class ShoplistEditionComponent {

  items$: Observable<ShopListItem[]>;
  product$: Observable<ProductUI[]>;

  itemForm: FormGroup;
  shoplistId: ID;

  constructor(
    private query: ShopListQuery,
    private service: ShopListService,
    private fb: FormBuilder,
    private appTitleService: AppTitleService,
    private route: ActivatedRoute,
    private productQuery: ProductQuery
  ) {
    this.makeForm();
  }

  makeForm(): any {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: [undefined]
    });
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.shoplistId = params.id;
      this.items$ = this.query.getItemsByShopListId(this.shoplistId);
      this.appTitleService.setTitle(`Shopper - Edition ${this.shoplistId}`);
    });

    this.product$ = this.productQuery.getProducts();
  }

  createShoplistItem(formValue) {
    if (!this.itemForm.valid) {
      return;
    }

    this.service.createShopListItem(this.shoplistId, formValue.name, null);
    this.itemForm.patchValue({ name: '' });
  }

}
