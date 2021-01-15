import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppPaths } from './app.constants';
import { ShopperPaths } from './shopper/shopper.constants';
import { AuthService } from './chill/authentication/auth-service';

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
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async login() {
    const user = await this.authService.signin('google');
    console.info('USER', user);
  }
}
