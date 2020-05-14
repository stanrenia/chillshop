import { Component, OnInit } from '@angular/core';
import { ShopListQuery, ShopListUI } from '../../state/shoplist.query';
import { Observable } from 'rxjs';
import { AppTitleService } from 'src/app/chill/services/app-title.service';
import { Router } from '@angular/router';
import { AppPaths } from 'src/app/app.constants';
import { ShopperPaths } from '../../shopper.constants';

@Component({
    selector: 'app-archives',
    templateUrl: './archives.component.html',
    styleUrls: ['./archives.component.scss'],
})
export class ArchivesComponent implements OnInit {
    shoplists$: Observable<ShopListUI[]>;

    constructor(
        private query: ShopListQuery,
        private appTitleService: AppTitleService,
        private router: Router
    ) {}

    ngOnInit() {
        this.shoplists$ = this.query.getAllForUI({ archived: true });
    }

    ionViewWillEnter() {
        this.appTitleService.setTitle('Archives');
    }

    goToEdit(shoplistId) {
        this.router.navigate([AppPaths.SHOPPER, ShopperPaths.EDIT, shoplistId]);
    }
}
