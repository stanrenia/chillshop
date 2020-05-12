import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ShopListItemGroup, ShopListItemUI } from '../../state/shoplist.query';

@Component({
  selector: 'app-shoplist-item-group',
  templateUrl: './shoplist-item-group.component.html',
  styleUrls: ['./shoplist-item-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoplistItemGroupComponent implements OnInit {

  @Input() itemGroup: ShopListItemGroup;
  @Input() disabled = false;
  @Output() checkChanged: EventEmitter<ShopListItemUI> = new EventEmitter();
  @Output() editClicked: EventEmitter<ShopListItemUI> = new EventEmitter();
  @Output() removeClicked: EventEmitter<ShopListItemUI> = new EventEmitter();
  @Output() reordered: EventEmitter<ShopListItemUI[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onCheckChanged(item: ShopListItemUI) {
    this.checkChanged.emit(item);
  }

  onEditClicked(item: ShopListItemUI) {
    this.editClicked.emit(item);
  }

  onRemoveClicked(item: ShopListItemUI) {
    this.removeClicked.emit(item);
  }

  doReorder(ev: any) {
    const sortedItems: ShopListItemUI[] = ev.detail.complete(this.itemGroup.items);
    this.reordered.emit(sortedItems);
  }

  trackByIdFn(index, item) {
    return item.id;
  }

}
