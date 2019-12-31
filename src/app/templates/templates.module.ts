import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesPageComponent } from './templates-page/templates-page.component';
import { IonicModule } from '@ionic/angular';
import { ChillModule } from '../chill/chill.module';
import { TemplateEditionModalComponent } from './template-edition-modal/template-edition-modal.component';


@NgModule({
  declarations: [
    TemplatesPageComponent,
    TemplateEditionModalComponent
  ],
  entryComponents: [TemplateEditionModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ChillModule,
    TemplatesRoutingModule
  ]
})
export class TemplatesModule { }
