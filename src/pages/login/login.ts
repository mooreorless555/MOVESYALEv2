import { Component } from '@angular/core';

import { Facebook, NativeStorage } from 'ionic-native';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login-provider';
import { Globals } from '../functions/functions';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';


//var url = 'http://54.175.164.247:80/';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Globals]
})
export class LoginPage {
  FB_APP_ID: number = 1726230761032513;

  public info = "By Yalies. For Yalies.";
  public user = "nullman";

  public firsttime = {
    email: "",
    confirmcode: ""
  };

  public debugflag = true;

  constructor(public loginProvider: LoginProvider, public globals:Globals, public http:Http, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

 toggleDebugFlag() {
    this.globals.debugflag = !(this.globals.debugflag);
  }

  doLogin() {
    if (this.globals.debugflag) {
      this.navCtrl.setRoot(TabsPage);
    } else {
    var me = this;
    var permissions = new Array();

    permissions = ["public_profile", "email"];

    Facebook.login(permissions)
      .then(function(res) {

        //let userId = res.authResponse.userID;
        //let social_token = res.authResponse.accessToken;
        let params = new Array();

        //alert(response.authResponse.accessToken);
        return Promise.all([res, Facebook.api("/me?fields=name,email", params)]);
      
      })
      .then(function(results) {
        //alert(results);
        //alert(results[0]);
        //alert("Results: " + results[1] + " name: " + results[1].name);
        //alert(results[1].name);
        // this.user = results[1];

        return Promise.all([results, me.loginProvider.doApiLogin(results)])


      })
      .then(function(results) {
        /*
        NativeStorage.setItem('user', {
          social_token: results[0][0],
          token: results[1]
        })
        */
        // this.presentWelcome();
        me.navCtrl.setRoot(TabsPage);
      })
      .catch(function(error) {
        alert("Error in doLogin(): " + error);
      });
    }

  }

presentWelcome() {
    let welcome = this.toastCtrl.create({
      message: "Hey " + this.user + "!",
      duration: 1000
    });
    welcome.present();
  }

presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'First Time',
    message: "Before we let you sign in, we just need to confirm that you have a yale.edu email. Type it in below and we'll send you a confirmation code.",
    inputs: [
      {
        name: 'email',
        placeholder: 'Yale Email'
      }
    ],
    buttons: [
      {
        text: 'Go Back',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send Confirmation',
        handler: data => {
          this.firsttime.email = data.email;
          if (data.email.endsWith("")) { // Change this back to @yale.edu to filter out Yale emails.
            if (data.email == "@yale.edu") {
              this.presentError("This isn't an email.");
              return false;
            }
            else {
              this.presentConfirmCode();
            }
          } else {
            this.presentError("You didn't type in a valid Yale email.");
            return false;
          }
        }
      }
    ]
  });
  alert.present();
}

presentConfirmCode() {
  let alert = this.alertCtrl.create({
    title: 'Confirm',
    message: "Okay, we sent a confirmation code to " + this.firsttime.email + ". Type it in here and that's it!",
    inputs: [
      {
        name: 'code',
        placeholder: 'Confirmation Code'
      }
    ],
    buttons: [
      {
        text: 'Go Back',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: data => {
          if (1) {
            this.navCtrl.push(TabsPage);
          } else {
            return false;
          }
        }
      }
    ]
  });
alert.present();
}

presentError(msg) {
  let msgs = ['Oops', 'Try Again', 'Uh-oh'];
  let alert = this.alertCtrl.create({
    title: msgs[Math.floor(Math.random() * msgs.length)],
    message: msg,
    buttons: ['Go Back']
  });
alert.present();
}

}
