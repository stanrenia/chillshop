import { Component, OnInit } from '@angular/core';
import { AppTitleService } from '../services/app-title.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit {

  constructor(public appTitleService: AppTitleService) { }

  ngOnInit() {}

}
