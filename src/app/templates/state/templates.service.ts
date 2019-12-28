import { Injectable } from '@angular/core';
import { ID, guid } from '@datorama/akita';
import { TemplatesStore } from './templates.store';
import { Template } from './template.model';
import { TemplatesQuery } from './templates.query';
import { ShopListService } from 'src/app/shopper/state/shoplist.service';

@Injectable({ providedIn: 'root' })
export class TemplatesService {

  constructor(private templatesStore: TemplatesStore, private templatesQuery: TemplatesQuery, private shoplistService: ShopListService) {
  }

  get() {
    // return this.http.get('https://api.com').pipe(tap(entities => {
    //   this.templatesStore.set(entities)
    // }));
  }

  add(template: Template): string {
    const exists = this.templatesQuery.getAll({ 
      filterBy: e => e.shoplistId === template.shoplistId || e.label === template.label
    }).length > 0;
    if (exists) {
      return null;
    } else {
      template.id = guid();
      this.templatesStore.add(template);
      this.shoplistService.setAsTemplate(template.shoplistId);
      return template.id;
    }
  }

  update(id, template: Partial<Template>) {
    this.templatesStore.update(id, template);
  }

  remove(id: ID) {
    this.templatesStore.remove(id);
  }
}
