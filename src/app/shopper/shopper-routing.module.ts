import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopperPage } from './shopper.page';
import { ShoplistManagerComponent } from './components/shoplist-manager/shoplist-manager.component';
import { ShoplistEditionComponent } from './components/shoplist-edition/shoplist-edition.component';
import { ShopperPaths } from './shopper.constants';

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