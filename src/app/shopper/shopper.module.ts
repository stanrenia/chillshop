import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShopperPage } from './shopper.page';
import { ShoplistComponent } from './components/shoplist/shoplist.component';
import { ShoplistItemComponent } from './components/shoplist-item/shoplist-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShopperPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShopperPage, ShoplistComponent, ShoplistItemComponent]
})
export class ShopperPageModule {}
