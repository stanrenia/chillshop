import { NgModule, Injector } from '@angular/core';

@NgModule({
})
export class InjectorModule {
  static injector: Injector;

  constructor(
    injector: Injector
  ) {
    InjectorModule.injector = injector;
  }

}
