import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistManagerComponent } from './shoplist-manager.component';
import { FormBuilder } from '@angular/forms';
import { ShopListQuery } from '../../state/shoplist.query';
import { ShopListService } from '../../state/shoplist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppTitleService } from '../../services/app-title.service';

describe('ShoplistManagerComponent', () => {
  let component: ShoplistManagerComponent;
  let fixture: ComponentFixture<ShoplistManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoplistManagerComponent ],
      providers: [
        { provide: ShopListQuery, useValue: ShopListQuery },
    { provide: ShopListService, useValue: ShopListService },
    { provide: FormBuilder },
    { provide: Router, useValue: Router },
    { provide: ActivatedRoute, useValue: ActivatedRoute },
    { provide: AppTitleService, useValue: AppTitleService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoplistManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
