import { Component, OnInit } from '@angular/core';
import { TemplatesQuery } from '../state/templates.query';
import { TemplatesService } from '../state/templates.service';
import { Observable } from 'rxjs';
import { Template } from '../state/template.model';
import { AppTitleService } from 'src/app/common/services/app-title.service';

@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.scss'],
})
export class TemplatesPageComponent implements OnInit {
  templates: Observable<Template[]>;

  constructor(private query: TemplatesQuery, private service: TemplatesService, titleService: AppTitleService) { 
    titleService.setTitle('Templates');
  }

  ngOnInit() {
    this.templates = this.query.getTemplates();
  }

}
