import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShopperPage } from './shopper.page';
import { ShoplistItemGroupComponent } from './components/shoplist-item-group/shoplist-item-group.component';
import { ShoplistManagerComponent } from './components/shoplist-manager/shoplist-manager.component';
import { ShoplistEditionComponent } from './components/shoplist-edition/shoplist-edition.component';
import { ShopperRoutingModule } from './shopper-routing.module';
import { EditionModalComponent } from './components/edition-modal/edition-modal.component';
import { TemplatesModule } from '../templates/templates.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShopperRoutingModule,
    TemplatesModule
  ],
  declarations: [ShopperPage, ShoplistManagerComponent, ShoplistEditionComponent, ShoplistItemGroupComponent, EditionModalComponent],
  entryComponents: [EditionModalComponent]
})
export class ShopperPageModule {}
