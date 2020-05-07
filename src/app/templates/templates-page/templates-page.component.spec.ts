import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesPageComponent } from './templates-page.component';
import { TemplatesQuery } from '../state/templates.query';
import { TemplatesService } from '../state/templates.service';
import { AppTitleService } from 'src/app/chill/services/app-title.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

describe('TemplatesPageComponent', () => {
  let titleService: Partial<AppTitleService>;
  let templateQuery: Partial<TemplatesQuery>;
  let component: TemplatesPageComponent;
  let fixture: ComponentFixture<TemplatesPageComponent>;

  beforeEach(async(() => {
    titleService = { setTitle: jest.fn() };
    templateQuery = { getTemplates: jest.fn() };

    TestBed.configureTestingModule({
      declarations: [ TemplatesPageComponent ],
      providers: [
        { provide: TemplatesQuery, useValue: templateQuery },
        { provide: TemplatesService, useValue: {} },
        { provide: AppTitleService, useValue: titleService },
        { provide: Router, useValue: {} },
        { provide: ModalController, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
