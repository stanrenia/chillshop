import { CategoryStore, Category } from './category.state';
import { Injectable } from '@angular/core';
import { CategoryQuery } from './category.query';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(private categoryStore: CategoryStore, private query: CategoryQuery) { }

    createCategory(label: string) {
        const count = this.query.getCount();
        this.categoryStore.add({ id: count + 1, label } as Category);
    }
}
