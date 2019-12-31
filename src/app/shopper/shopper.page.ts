import { Component, OnInit } from '@angular/core';
import { AppTitleService } from '../chill/services/app-title.service';

@Component({
  selector: 'app-shopper',
  templateUrl: './shopper.page.html',
  styleUrls: ['./shopper.page.scss'],
})
export class ShopperPage implements OnInit {

  constructor(public appTitleService: AppTitleService) { }

  ngOnInit() {}

}
