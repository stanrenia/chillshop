import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShopListItemGroup, ShopListItemUI } from '../../state/shoplist.query';

@Component({
  selector: 'app-shoplist-item-group',
  templateUrl: './shoplist-item-group.component.html',
  styleUrls: ['./shoplist-item-group.component.scss'],
})
export class ShoplistItemGroupComponent implements OnInit {

  @Input() itemGroup: ShopListItemGroup;
  @Output() checkChanged: EventEmitter<ShopListItemUI> = new EventEmitter();
  @Output() editClicked: EventEmitter<ShopListItemUI> = new EventEmitter();
  @Output() reordered: EventEmitter<ShopListItemUI[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onCheckChanged(item: ShopListItemUI) {
    this.checkChanged.emit(item);
  }

  onEditClicked(item: ShopListItemUI) {
    this.editClicked.emit(item);
  }

  doReorder(ev: any) {
    const sortedItems = ev.detail.complete(this.itemGroup.items);
    this.reordered.emit(sortedItems);
  }

  trackByIdFn(index, item) {
    return item.id;
  }

}
