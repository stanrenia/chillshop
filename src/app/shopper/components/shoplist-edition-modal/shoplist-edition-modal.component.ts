import { Component, OnInit } from '@angular/core';
import { ID } from '@datorama/akita';
import { ModalController, NavParams } from '@ionic/angular';
import { ShoplistCategoryQuery } from '../../state/shoplist-category.query';
import { ShoplistCategoryService } from '../../state/shoplist-category.service';
import { filter, distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ShoplistCategory } from '../../state/shoplist-category.state';

export interface ShoplistEditionModalProps {
  label: string;
  categoryName: string;
}

@Component({
  selector: 'app-shoplist-edition-modal',
  templateUrl: './shoplist-edition-modal.component.html',
  styleUrls: ['./shoplist-edition-modal.component.scss']
})
export class ShoplistEditionModalComponent implements OnInit {
  props: ShoplistEditionModalProps;
  shoplistForm: FormGroup;
  categories$: Observable<ShoplistCategory[]>;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private categoriesQuery: ShoplistCategoryQuery,
    private categoriesService: ShoplistCategoryService,
    private fb: FormBuilder
  ) {
    this.makeForm();
  }

  private makeForm() {
    this.shoplistForm = this.fb.group({
      label: [null, Validators.required],
      categoryName: [null]
    });
  }

  ngOnInit() {
    this.props = this.navParams.data as ShoplistEditionModalProps;

    this.shoplistForm.patchValue({
      ...this.props
    });

    this.categories$ = this.categoriesQuery.selectVisibleCategories();
    this.setFormObservables();
  }

  private setFormObservables(): any {
    this.shoplistForm
      .get('label')
      .valueChanges.pipe(
        filter((name: string) => name && name.length > 2),
        distinctUntilChanged(),
        debounceTime(200),
        tap(nextName => {
          this.categoriesService.setFilter({ name: nextName });
        })
      )
      .subscribe();
  }

  dismissModal(e) {
    this.modalCtrl.dismiss();
  }

  edit() {
    this.modalCtrl.dismiss(this.shoplistForm.value);
  }

  selectCategory(cat: ShoplistCategory) {
    this.shoplistForm.patchValue({
      categoryName: cat.label
    });
    this.categoriesService.setFilter({ name: null });
  }

  trackByIdFn(ngForElement: { id: ID }) {
    return ngForElement.id;
  }
}
