import { NgModule, Injector } from '@angular/core';
import { ConnectionService } from "./services/connection.service";
import { InjectorModule } from './injector.module';

@NgModule({
  providers: [
    ConnectionService
  ],
  imports: [
    InjectorModule
  ]
})
export class ChillModule {
}
