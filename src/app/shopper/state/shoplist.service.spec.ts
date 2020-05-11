import { ShopListService, CreateShopListArgs } from './shoplist.service';
import { ShopListStore, ShopList } from './shoplist.state';
import * as akita from '@datorama/akita';
import { ShopListQuery } from './shoplist.query';
import { ProductService } from './product.service';
import { ShoplistCategoryService } from './shoplist-category.service';
import { ID } from '@datorama/akita';
import { TestBed } from '@angular/core/testing';
import * as TestUtils from 'src/testing/test-utils';
import { DatePipe } from '@angular/common';

describe('ShoplistService', () => {
    let shoplistService: ShopListService;
    let store: Partial<ShopListStore>;
    let query: Partial<ShopListQuery>;
    let shoplistCategoryService: Partial<ShoplistCategoryService>;
    let productService: Partial<ProductService>;
    let datePipe: DatePipe;

    jest.mock('@datorama/akita');
    const GUID = '12';
    jest.spyOn(akita, 'guid').mockReturnValue(GUID);

    const nowDate = new Date('2020-05-10T09:00:00Z');
    TestUtils.mockDateNowForAllTests(nowDate);

    beforeEach(() => {
        query = { getAll: () => {} } as any;
        shoplistCategoryService = {};
        productService = {};

        TestBed.configureTestingModule({
            providers: [
                ShopListService,
                ShopListStore,
                DatePipe,
                { provide: ShopListQuery, useValue: query },
                {
                    provide: ShoplistCategoryService,
                    useValue: shoplistCategoryService,
                },
                { provide: ProductService, useValue: productService },
            ],
        });

        shoplistService = TestBed.inject(ShopListService);
        store = TestBed.inject(ShopListStore);
        datePipe = TestBed.inject(DatePipe);
    });

    it('should create a new shoplist with label and dueDate', () => {
        // GIVEN
        const label = 'testName';
        const dueDate = new Date();
        const args = {
            label,
            dueDate,
        } as CreateShopListArgs;

        jest.spyOn(store, 'add');

        // WHEN
        shoplistService.createShopList(args);

        // THEN
        expect(store.add).toHaveBeenCalledWith({
            id: GUID,
            label,
            dueDate,
            items: [],
            created: nowDate,
        } as ShopList);
    });

    it('should create a new shoplist with dueDate as default label when dueDate is provided', () => {
        // GIVEN
        const label = '';
        const dueDate = new Date();
        const args = {
            label,
            dueDate,
        } as CreateShopListArgs;

        jest.spyOn(store, 'add');

        // WHEN
        shoplistService.createShopList(args);

        // THEN
        expect(store.add).toHaveBeenCalledWith({
            id: GUID,
            label: `List of ${datePipe.transform(dueDate, 'dd/MM/yyyy')}`,
            dueDate,
            items: [],
            created: nowDate,
        } as ShopList);
    });

    it('should create a new shoplist with created as default label when dueDate is not provided', () => {
        // GIVEN
        const label = '';
        const args = {
            label,
        } as CreateShopListArgs;

        jest.spyOn(store, 'add');

        // WHEN
        shoplistService.createShopList(args);

        // THEN
        expect(store.add).toHaveBeenCalledWith({
            id: GUID,
            label: `List of ${datePipe.transform(nowDate, 'dd/MM/yyyy')}`,
            items: [],
            created: nowDate,
        } as ShopList);
    });

    it('should remove an item from the shoplist', () => {
        // GIVEN
        const shoplistId: ID = '1';
        const itemId: ID = '2';
        const update = <jest.SpyInstance>jest.spyOn(store, 'update');

        // WHEN
        shoplistService.removeItem(shoplistId, itemId);

        // THEN
        expect(update).toHaveBeenCalledTimes(1);
        expect(update.mock.calls[0][0]).toBe(shoplistId);
        const removeItemAction = update.mock.calls[0][1];
        const fakeShoplist = <ShopList>{
            items: [{ id: '1' }, { id: itemId }, { id: '3' }],
        };
        const updatedShoplist: ShopList = removeItemAction(fakeShoplist);
        expect(updatedShoplist).toStrictEqual({
            items: [{ id: '1' }, { id: '3' }],
        });
    });
});
