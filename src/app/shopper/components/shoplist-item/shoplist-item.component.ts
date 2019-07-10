import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShopListItemUI } from '../../state/shoplist.query';

@Component({
  selector: 'app-shoplist-item',
  templateUrl: './shoplist-item.component.html',
  styleUrls: ['./shoplist-item.component.scss'],
})
export class ShoplistItemComponent implements OnInit {

  @Input() item: ShopListItemUI;
  @Output() checkChanged: EventEmitter<boolean> = new EventEmitter();
  @Output() editClicked: EventEmitter<void> = new EventEmitter(); 

  constructor() { }

  ngOnInit() {}

  onCheckChanged() {
    this.checkChanged.emit();
  }

  onEditClicked() {
    this.editClicked.emit();
  }

}
