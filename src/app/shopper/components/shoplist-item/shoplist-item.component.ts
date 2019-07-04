import { Component, OnInit, Input } from '@angular/core';
import { ShopListItemUI } from '../../state/shoplist.query';

@Component({
  selector: 'app-shoplist-item',
  templateUrl: './shoplist-item.component.html',
  styleUrls: ['./shoplist-item.component.scss'],
})
export class ShoplistItemComponent implements OnInit {

  @Input() item: ShopListItemUI;

  constructor() { }

  ngOnInit() {}

}
