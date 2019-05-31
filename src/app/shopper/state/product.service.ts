import { Injectable } from '@angular/core';
import { ProductStore, Product } from './product.state';
import { ProductQuery } from './product.query';
import { guid, ID } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private store: ProductStore, private query: ProductQuery) {
    }

    createProduct(name: string, categoryName: string): ID {
        const productsSameName = this.query.getAll({ filterBy: product => product.name === name, limitTo: 1 });
        const currentProduct = productsSameName.length && productsSameName[0];

        // Product already exists
        if (currentProduct) {
            return currentProduct.id;
        }

        let categoryId;

        const product = { id: guid(), name, categoryId } as Product;
        this.store.add(product);
        return product.id;
    }
}
