import { Component, OnInit, Input } from '@angular/core';
import { ShopListItem } from '../../state/shoplist.state';

@Component({
  selector: 'app-shoplist-item',
  templateUrl: './shoplist-item.component.html',
  styleUrls: ['./shoplist-item.component.scss'],
})
export class ShoplistItemComponent implements OnInit {

  @Input() item: ShopListItem;

  constructor() { }

  ngOnInit() {}

}
