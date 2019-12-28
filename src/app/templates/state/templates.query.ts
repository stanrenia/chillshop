import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TemplatesStore, TemplatesState } from './templates.store';
import { Template } from './template.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TemplatesQuery extends QueryEntity<TemplatesState, Template> {

  constructor(protected store: TemplatesStore) {
    super(store);
  }

  getTemplates(): Observable<Template[]> {
    return this.selectAll();
  }

}

