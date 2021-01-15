import { NgModule } from '@angular/core';
import { ConnectionService } from './services/connection.service';
import { InjectorModule } from './injector.module';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ModalService } from './services/modal.service';
import { AuthService } from './authentication/auth-service';
import { AuthStore } from './authentication/auth-store';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  providers: [ConnectionService, ModalService, AuthService, AuthStore],
  imports: [InjectorModule, CommonModule, IonicModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule],
  declarations: [TitleBarComponent, CreateEntityComponent, ConfirmationModalComponent],
  exports: [TitleBarComponent],
  entryComponents: [CreateEntityComponent, ConfirmationModalComponent]
})
export class ChillModule {}
