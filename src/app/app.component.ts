import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';

import { MovesService } from '../pages/services/MovesService'

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [MovesService]
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: LoginPage;

  constructor(platform: Platform) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString("#886FE8");
      Splashscreen.show();
      setTimeout(() => {
        Splashscreen.hide();
      }, 3000);
      // Check if the user is already logged in
      let env = this;
  
      NativeStorage.getItem('user')
      .then((data) => {
        //alert("Got tokens" + data);
        // user was previously logged in
        env.nav.setRoot(TabsPage);
        Splashscreen.hide();
      }, (err) => {
        //alert('No user found');
        // user not previously logged in
        env.nav.setRoot(LoginPage)
        Splashscreen.hide();
      });

    });
  }
}
