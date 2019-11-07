import { ProductService } from './product.service';
import { ProductStore, Product } from './product.state';
import { ProductQuery } from './product.query';
import { ProductCategoryService } from './product-category.service';
import { InjectorModule } from 'src/app/common/injector.module';
import { Injector } from '@angular/core';
import * as akita from '@datorama/akita';

describe('ProductService', () => {

    let productService: ProductService;
    let store: ProductStore;
    let query: ProductQuery;
    let productCategoryService: ProductCategoryService;
    let injector: Injector;

    jest.mock('@datorama/akita');
    const GUID = '12';
    jest.spyOn(akita, 'guid').mockReturnValue(GUID);

    beforeEach(() => {

        injector = { get: jest.fn() } as any;
        const injectorModule = new InjectorModule(injector);

        query = { getAll: () => {}} as any;
        store = { add: () => {} } as any;
        productCategoryService = {} as any;

        productService = new ProductService(store, query, productCategoryService);
    });

    it('Should create a product without category', () => {
        // GIVEN
        const productName = 'apple';
        const undefinedCategory = undefined;
        const expectedProduct = { id: GUID, name: productName, categoryId: undefinedCategory } as Product;
        const getAll = jest.spyOn(query, 'getAll');
        getAll.mockReturnValue([]);
        const add = jest.spyOn(store, 'add');

        // WHEN
        const productId = productService.createProduct(productName, undefinedCategory);

        // THEN
        expect(add).toHaveBeenCalledWith(expectedProduct);
        expect(productId).toBe(GUID);
    });

    it('Should not create a product when name already exist', () => {
        // GIVEN
        const productName = 'apple';
        const undefinedCategory = undefined;
        const existingProductId = '23';
        const getAll = jest.spyOn(query, 'getAll');
        getAll.mockReturnValue([{id: existingProductId, name: productName} as Product]);
        const add = jest.spyOn(store, 'add');

        // WHEN
        const productId = productService.createProduct(productName, undefinedCategory);

        // THEN
        expect(add).not.toHaveBeenCalled();
        expect(productId).toBe(existingProductId);
    });
});
