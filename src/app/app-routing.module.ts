import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const AppPaths = {
  SHOPPER: 'shopper',
  TEMPLATES: 'templates'
};

const routes: Routes = [
  { path: `${AppPaths.SHOPPER}`, loadChildren: () => import('./shopper/shopper.module').then(m => m.ShopperPageModule) },
  // TODO : Shopper module import Templates module, so we need to re-think about lazy loading
  { path: `${AppPaths.TEMPLATES}`, loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule) },
  { path: '', redirectTo: `${AppPaths.SHOPPER}`, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
