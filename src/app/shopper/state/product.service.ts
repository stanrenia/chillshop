import { Injectable } from '@angular/core';
import { ProductStore, Product } from './product.state';
import { ProductQuery } from './product.query';
import { guid } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private store: ProductStore, private query: ProductQuery) {
    }
    
    createProduct(name: string, categoryName: string): any {
        let categoryId;
        

        const product = { id: guid(), name, categoryId: categoryId } as Product;
        this.store.add(product);
    }
}
