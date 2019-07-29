import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShopperPage } from './shopper.page';
import { ShoplistComponent } from './components/shoplist/shoplist.component';
import { ShoplistItemComponent } from './components/shoplist-item/shoplist-item.component';
import { ShoplistManagerComponent } from './components/shoplist-manager/shoplist-manager.component';
import { ShoplistEditionComponent } from './components/shoplist-edition/shoplist-edition.component';
import { ShopperRoutingModule } from './shopper-routing.module';
import { EditionModalComponent } from './components/edition-modal/edition-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShopperRoutingModule
  ],
  declarations: [ShopperPage, ShoplistManagerComponent, ShoplistEditionComponent, ShoplistComponent, ShoplistItemComponent, EditionModalComponent],
  entryComponents: [EditionModalComponent]
})
export class ShopperPageModule {}
