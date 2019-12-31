import { ShopListService } from './shoplist.service';
import { ShopListStore, ShopList } from './shoplist.state';
import { InjectorModule } from 'src/app/chill/injector.module';
import { Injector } from '@angular/core';
import * as akita from '@datorama/akita';
import { ShopListQuery } from './shoplist.query';
import { ProductService } from './product.service';
import { ProductCategoryService } from './product-category.service';
import { ShoplistCategoryService } from './shoplist-category.service';
import { ID } from '@datorama/akita';

describe('ShoplistService', () => {

    let shoplistService: ShopListService;
    let store: ShopListStore;
    let query: ShopListQuery;
    let shoplistCategoryService: ShoplistCategoryService;
    let productService: ProductService;
    let productCategoryService: ProductCategoryService;
    let injector: Injector;

    jest.mock('@datorama/akita');
    const GUID = '12';
    jest.spyOn(akita, 'guid').mockReturnValue(GUID);

    beforeEach(() => {

        injector = { get: jest.fn() } as any;
        const injectorModule = new InjectorModule(injector);

        query = { getAll: () => {}} as any;
        store = { update: () => {} } as any;
        shoplistCategoryService = {} as any;
        productService = {} as any;
        productCategoryService = {} as any;

        shoplistService = new ShopListService(store, query, shoplistCategoryService, productService, productCategoryService);
    });

    it('Should remove an item from the shoplist', () => {
        // GIVEN
        const shoplistId: ID = '1';
        const itemId: ID = '2';
        const update = <jest.SpyInstance> jest.spyOn(store, 'update');

        // WHEN
        shoplistService.removeItem(shoplistId, itemId);

        // THEN
        expect(update).toHaveBeenCalledTimes(1);
        expect(update.mock.calls[0][0]).toBe(shoplistId);
        const removeItemAction = update.mock.calls[0][1];
        const fakeShoplist =  <ShopList> { items: [ { id: '1' }, { id: itemId }, { id: '3' } ] };
        const updatedShoplist: ShopList = removeItemAction(fakeShoplist);
        expect(updatedShoplist).toStrictEqual({ items: [ { id: '1' }, { id: '3' } ] });
    });
});
