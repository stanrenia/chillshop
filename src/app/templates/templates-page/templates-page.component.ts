import { Component, OnInit } from '@angular/core';
import { TemplatesQuery } from '../state/templates.query';
import { TemplatesService } from '../state/templates.service';
import { Observable } from 'rxjs';
import { Template } from '../state/template.model';
import { AppTitleService } from 'src/app/chill/services/app-title.service';
import { Router } from '@angular/router';
import { ShopperPaths } from '../../shopper/shopper.constants';
import { AppPaths } from 'src/app/app.constants';


@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.scss']
})
export class TemplatesPageComponent implements OnInit {
  templates: Observable<Template[]>;

  constructor(
    private query: TemplatesQuery,
    private service: TemplatesService,
    private titleService: AppTitleService,
    private router: Router
  ) {
    titleService.setTitle('Templates');
  }

  ngOnInit() {
    this.templates = this.query.getTemplates();
  }

  goToEdit(template: Template) {
    this.router.navigate([AppPaths.SHOPPER, ShopperPaths.EDIT, template.shoplistId]);
  }

  onEditClicked(template: Template) {
    const newLabel = 'newLabel';
    this.service.update(template.id, { label: newLabel });
  }

  onRemoveClicked(template: Template) {
    this.service.remove(template.id);
  }
}
