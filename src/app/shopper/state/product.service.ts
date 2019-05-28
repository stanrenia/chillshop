import { Injectable } from '@angular/core';
import { ProductStore, Product } from './product.state';
import { ProductQuery } from './product.query';
import { guid } from '@datorama/akita';
import { query } from '@angular/core/src/render3';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private store: ProductStore, private query: ProductQuery) {
    }

    createProduct(name: string, categoryName: string): any {

        if (this.query.hasEntity(e => e.name === name)) {
            return;
        }

        let categoryId;

        const product = { id: guid(), name, categoryId } as Product;
        this.store.add(product);
        this.store.ui.update(product.id, e => ({ name }));
    }
}
