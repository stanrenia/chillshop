import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppPaths } from './app.constants';
import { ShopperPaths } from './shopper/shopper.constants';
import { AuthService } from './chill/authentication/auth-service';
import { AuthQuery } from './chill/authentication/auth-query';
import { Observable } from 'rxjs';
import { Profile } from './chill/authentication/auth-store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Shopper',
      url: `/${AppPaths.SHOPPER}`,
      icon: 'cart'
    },
    {
      title: 'Templates',
      url: `/${AppPaths.TEMPLATES}`,
      icon: 'albums'
    },
    {
      title: 'Archives',
      url: `/${AppPaths.SHOPPER}/${ShopperPaths.ARCHIVES}`,
      icon: 'file-tray-stacked-outline'
    }
  ];

  profile$: Observable<Profile>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private authQuery: AuthQuery
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.profile$ = this.authQuery.profile$;
    this.authService.sync().subscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  login() {
    this.authService.signin('google');
  }
}

interface User {
  email: string;
}