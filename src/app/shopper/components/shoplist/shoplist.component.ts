// import { Component, OnInit } from '@angular/core';
// import { ShopListQuery } from '../../state/shoplist.query';
// import { Observable } from 'rxjs';
// import { ShopList, ShopListItem } from '../../state/shoplist.state';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ShopListService } from '../../state/shoplist.service';

// @Component({
//   selector: 'app-shoplist',
//   templateUrl: './shoplist.component.html',
//   styleUrls: ['./shoplist.component.scss'],
// })
// export class ShoplistComponent implements OnInit {

//   items$: Observable<ShopListItem[]>;

//   shopListForm: FormGroup;

//   constructor(
//     private query: ShopListQuery,
//     private service: ShopListService,
//     private fb: FormBuilder
//   ) {
//     this.makeForm();
//   }

//   makeForm(): any {
//     this.shopListForm = this.fb.group({
//       label: ['', Validators.required],
//       category: [undefined]
//     });
//   }

//   ngOnInit() {
//     const shopListId = 1;
//     this.items$ = this.query.getItemsByShopListId(1);
//   }

//   createShopList(formValue) {
//     if (!this.shopListForm.valid) {
//       return;
//     }

//     this.service.createShopList(formValue.label, null);
//     this.shopListForm.patchValue({ label: '' });
//   }

// }
