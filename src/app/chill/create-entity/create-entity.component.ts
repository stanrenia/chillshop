import { Component, OnInit, Input } from '@angular/core';

export interface CreateEntityProps {
  placeholder: string;
  onConfirmation: (val: string) => any;
}

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss'],
})
export class CreateEntityComponent implements OnInit {

  @Input('props') props: CreateEntityProps;

  constructor() { }

  ngOnInit() {}

  create(val: string) {
    this.props.onConfirmation(val);
  }

}
