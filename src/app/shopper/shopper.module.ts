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
import { ChillModule } from '../chill/chill.module';
import { CreateEntityComponent } from '../chill/create-entity/create-entity.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShopperRoutingModule,
    ChillModule,
    TemplatesModule
  ],
  declarations: [ShopperPage, ShoplistManagerComponent, ShoplistEditionComponent, ShoplistItemGroupComponent, EditionModalComponent],
  entryComponents: [EditionModalComponent, CreateEntityComponent]
})
export class ShopperPageModule {}
