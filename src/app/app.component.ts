import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppPaths } from './app.constants';
import { ShopperPaths } from './shopper/shopper.constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
