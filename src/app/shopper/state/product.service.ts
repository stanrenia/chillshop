import { Injectable } from '@angular/core';
import { ProductStore } from './product.state';
import { ProductQuery } from './product.query';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private store: ProductStore, private query: ProductQuery) { 
    }
}
