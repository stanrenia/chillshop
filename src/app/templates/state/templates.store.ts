import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Template } from './template.model';

export interface TemplatesState extends EntityState<Template> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'templates' })
export class TemplatesStore extends EntityStore<TemplatesState, Template> {

  constructor() {
    super();
  }

}

