import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

var url = 'http://54.175.164.247:80/';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  static get parameters() {
    return [[Http]];
  }

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  
  doApiLogin(data) {

    // alert(data)

    var body = JSON.stringify({
          name: data[1].name,
          email: data[1].email,
          social_token: data[0].authResponse.accessToken
    });

    var headers = new Headers({ 'Content-Type': 'application/json', });
    var options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {

      this.http.post(url + 'api/FBauthenticate', body, options).subscribe((res) => {

        //alert("Resopnse: " + res);
        var data = res.json();
        resolve(data);

      }, (err) => {
        //alert("Error is doApiLogin(): " + err);
        reject(err);

      });
    });
  }

  getProfile(token) {

    var headers = new Headers({ 'Authorization': token.token });

    return new Promise((resolve, reject) => {

      this.http.get(url + 'api/profile', { headers: headers }).subscribe((res) => {
        //alert(res);
        let data = res.json();
        //alert(data);
        resolve(data);

      }, (err) => {

        reject(err);

      })

    });

  }


}
