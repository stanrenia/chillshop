import { Component, OnInit } from '@angular/core';
import { ShopListQuery, ShopListUI } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopListService } from '../../state/shoplist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppTitleService } from '../../../chill/services/app-title.service';
import { ShopperPaths } from '../../shopper.constants';
import { TemplatesQuery } from 'src/app/templates/state/templates.query';
import { Template } from 'src/app/templates/state/template.model';

@Component({
  selector: 'app-shoplist-manager',
  templateUrl: './shoplist-manager.component.html',
  styleUrls: ['./shoplist-manager.component.scss']
})
export class ShoplistManagerComponent implements OnInit {
  shoplists$: Observable<ShopListUI[]>;

  shopListForm: FormGroup;
  displayForm = false;
  templates: Observable<Template[]>;

  constructor(
    private query: ShopListQuery,
    private service: ShopListService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appTitleService: AppTitleService,
    private templatesQuery: TemplatesQuery
  ) {
    this.makeForm();
  }

  makeForm(): any {
    this.shopListForm = this.fb.group({
      label: ['', Validators.required],
      category: [undefined],
      selectedTemplate : [null]
    });
  }

  ngOnInit() {
    this.appTitleService.setTitle('Shopper');
    this.shoplists$ = this.query.getAllForUI();
    this.templates = this.templatesQuery.getTemplates();
  }

  ionViewWillEnter() {}

  createShopList(formValue) {
    if (!this.shopListForm.valid) {
      return;
    }

    this.service.createShopList(formValue.label, formValue.category, formValue.selectedTemplate);

    // Clear inputs
    this.shopListForm.patchValue({
      label: '',
      category: '',
      selectedTemplate: null
    });
  }

  goToEdit(shoplist: ShopListUI) {
    this.router.navigate([ShopperPaths.EDIT, shoplist.id], {
      relativeTo: this.route
    });
  }
}
