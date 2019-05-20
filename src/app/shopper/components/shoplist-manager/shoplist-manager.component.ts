import { Component, OnInit } from '@angular/core';
import { ShopListQuery, ShopListUI } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShopList } from '../../state/shoplist.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopListService } from '../../state/shoplist.service';

@Component({
  selector: 'app-shoplist-manager',
  templateUrl: './shoplist-manager.component.html',
  styleUrls: ['./shoplist-manager.component.scss'],
})
export class ShoplistManagerComponent implements OnInit {
  
  shoplists$: Observable<ShopListUI[]>;
  
  shopListForm: FormGroup;
  displayForm = false;
  
  constructor(
    private query: ShopListQuery,
    private service: ShopListService,
    private fb: FormBuilder
    ) { 
      this.makeForm();
    }

  makeForm(): any {
    this.shopListForm = this.fb.group({
      label: ['', Validators.required],
      category: [undefined]
    });
  }

  ngOnInit() {
    this.shoplists$ = this.query.getAllForUI();
  }

  createShopList(formValue) {
    if (!this.shopListForm.valid) {
      return;
    }

    this.service.createShopList(formValue.label, formValue.category);

    // Clear inputs
    this.shopListForm.patchValue({
      label: '',
      category: ''
    });
  }

}
