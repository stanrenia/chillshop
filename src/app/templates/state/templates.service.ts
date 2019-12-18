import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { TemplatesStore } from './templates.store';
import { Template } from './template.model';

@Injectable({ providedIn: 'root' })
export class TemplatesService {

  constructor(private templatesStore: TemplatesStore) {
  }

  get() {
    // return this.http.get('https://api.com').pipe(tap(entities => {
    //   this.templatesStore.set(entities)
    // }));
  }

  add(template: Template) {
    this.templatesStore.add(template);
  }

  update(id, template: Partial<Template>) {
    this.templatesStore.update(id, template);
  }

  remove(id: ID) {
    this.templatesStore.remove(id);
  }
}
