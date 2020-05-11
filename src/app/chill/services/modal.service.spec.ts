import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { ModalController } from '@ionic/angular';

describe('ModalService', () => {
  let modalCtrl: Partial<ModalController>;

  beforeEach(() => {
    modalCtrl = { create: jest.fn() };

    TestBed.configureTestingModule({
      providers: [{ provide: ModalController, useValue: modalCtrl }]
    });
  });

  it('should be created', () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service).toBeTruthy();
  });
});
