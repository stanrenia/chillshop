import { EntityState, EntityStore, StoreConfig, ID } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Category {
    id: ID;
    label: string;
    icon: string;
}

export interface CategoryState extends EntityState<Category>{
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'category' })
export class CategoryStore extends EntityStore<CategoryState, Category> {
  constructor() {
    super();
  }
}
