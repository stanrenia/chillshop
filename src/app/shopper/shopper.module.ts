import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShopperPage } from './shopper.page';
import { ShoplistItemGroupComponent } from './components/shoplist-item-group/shoplist-item-group.component';
import { ShoplistManagerComponent } from './components/shoplist-manager/shoplist-manager.component';
import { ShoplistEditionComponent } from './components/shoplist-edition/shoplist-edition.component';
import { ShopperRoutingModule } from './shopper-routing.module';
import { ShoplistItemEditionModalComponent } from './components/shoplist-item-edition-modal/shoplist-item-edition-modal.component';
import { TemplatesModule } from '../templates/templates.module';
import { ChillModule } from '../chill/chill.module';
import { ShoplistEditionModalComponent } from './components/shoplist-edition-modal/shoplist-edition-modal.component';
import { ShoplistCreationModalComponent } from './components/shoplist-creation-modal/shoplist-creation-modal.component';

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
  declarations: [
    ShopperPage,
    ShoplistManagerComponent,
    ShoplistEditionComponent,
    ShoplistItemGroupComponent,
    ShoplistItemEditionModalComponent,
    ShoplistEditionModalComponent,
    ShoplistCreationModalComponent
  ],
  entryComponents: [
    ShoplistItemEditionModalComponent,
    ShoplistEditionModalComponent,
    ShoplistCreationModalComponent
  ]
})
export class ShopperPageModule {}
