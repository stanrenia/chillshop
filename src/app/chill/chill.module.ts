import { NgModule } from '@angular/core';
import { ConnectionService } from './services/connection.service';
import { InjectorModule } from './injector.module';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  providers: [ConnectionService, ModalService],
  imports: [InjectorModule, CommonModule, IonicModule],
  declarations: [TitleBarComponent, CreateEntityComponent, ConfirmationModalComponent],
  exports: [TitleBarComponent],
  entryComponents: [CreateEntityComponent, ConfirmationModalComponent]
})
export class ChillModule {}
