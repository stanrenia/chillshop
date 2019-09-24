import { Injectable } from '@angular/core';
import { ProductStore, Product, ProductFilter } from './product.state';
import { ProductQuery } from './product.query';
import { guid, ID } from '@datorama/akita';
import { ProductCategoryService } from './product-category.service';
import { EnableOffline } from 'src/app/common/decorators/offline.service';
import { ProductOfflineService } from './product-offline.service';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(private store: ProductStore, private query: ProductQuery, private productCategoryService: ProductCategoryService, 
     ) {
    }

    @EnableOffline(ProductOfflineService)
    createProduct(name: string, categoryName: string): ID {
        const productsSameName = this.query.getAll({ filterBy: p => p.name === name, limitTo: 1 });
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

    updateProduct(productId: ID, propsToUpdate: Partial<Product>) {
        this.store.update(productId, propsToUpdate);
    }

    updateProductCategory(productId: ID, productCategoryName: string): void {
        const categoryId = this.productCategoryService.create(productCategoryName);
        
        this.updateProduct(productId, { categoryId });
    }

    setFilter(filter: ProductFilter): void {
        this.store.setFilter(filter);
    }
}

