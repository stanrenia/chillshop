import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductOfflineService {
    constructor() {
    }

    createProduct(name: string, categoryName: string) {
        console.info('OFFLINE CREATE PRODUCT ' + name + ' ' + categoryName, this);
    }
}
