import { NgModule } from '@angular/core';
import { ConnectionService } from './services/connection.service';
import { InjectorModule } from './injector.module';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { IonicModule } from '@ionic/angular';
import { AppTitleService } from './services/app-title.service';
import { CommonModule } from '@angular/common';

@NgModule({
  providers: [ConnectionService, AppTitleService],
  imports: [InjectorModule, CommonModule, IonicModule],
  declarations: [TitleBarComponent],
  exports: [TitleBarComponent]
})
export class ChillModule {}
