import { QueryEntity } from '@datorama/akita';
import { CategoryState, CategoryStore, Category } from './category.state';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryQuery extends QueryEntity<CategoryState, Category> {  
  constructor(protected store: CategoryStore) {
    super(store);
  }
}
