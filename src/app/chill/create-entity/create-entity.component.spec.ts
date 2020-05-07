import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntityComponent } from './create-entity.component';
import { ModalController, NavParams } from '@ionic/angular';

describe('CreateEntityComponent', () => {
  let component: CreateEntityComponent;
  let fixture: ComponentFixture<CreateEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEntityComponent ],
      providers: [
        { provide: ModalController, useValue: {} },
        { provide: NavParams, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
