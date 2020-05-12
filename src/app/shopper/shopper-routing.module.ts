import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopperPage } from './shopper.page';
import { ShoplistManagerComponent } from './pages/shoplist-manager/shoplist-manager.component';
import { ShoplistEditionComponent } from './pages/shoplist-edition/shoplist-edition.component';
import { ShopperPaths } from './shopper.constants';
import { ArchivesComponent } from './pages/archives/archives.component';

const routes: Routes = [
    {
        path: '',
        component: ShopperPage,
        children: [
            {
                path: '',
                component: ShoplistManagerComponent
            },
            {
                path: `${ShopperPaths.EDIT}/:id`,
                component: ShoplistEditionComponent
            },
            {
                path: `${ShopperPaths.ARCHIVES}`,
                component: ArchivesComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShopperRoutingModule { }
