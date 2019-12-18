import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'shopper', loadChildren: () => import('./shopper/shopper.module').then(m => m.ShopperPageModule) },
  // TODO : Shopper module import Templates module, so we need to re-think about lazy loading
  { path: 'templates', loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule) },
  { path: '', redirectTo: 'shopper', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
