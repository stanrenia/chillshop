import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShopperPage } from './shopper.page';
import { ShoplistComponent } from './components/shoplist/shoplist.component';

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
  declarations: [ShopperPage, ShoplistComponent]
})
export class ShopperPageModule {}
