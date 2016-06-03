import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import {CONSTANT} from '../utils/constant';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../models/user';

@Injectable()
export class UserData {
  storage: Storage;
  HAS_LOGGED_IN: string = 'hasLoggedIn';
  user: User;

  constructor(private events:Events,private http:Http) {
    this.storage = new Storage(LocalStorage);
  }

  doLogin(val) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
        this.http.post(CONSTANT.SERVICE_API_URL + 'login.do',
          this.encode(val), options)
          .subscribe((res: Response) => {
              let json = res.json();
              console.log(json);
              if (json && json.result == "success") {
                  this.storage.set('user_cache', JSON.stringify(json.data));
                  this.login();
                  resolve(json.result);
              } else {
                  alert(json.messages[0]);
              }

          }, (err: any) => { // on error
              console.error(err);
          });
    });
  }

  login(){
      this.storage.set(this.HAS_LOGGED_IN, true);
      this.events.publish('user:login');
  }

  signup(username, password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:signup');
  }

  logout() {
    let query_loginout_url = CONSTANT.SERVICE_API_URL + "queryLogin.do";
    this.http.get(query_loginout_url).subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        let json = res.json();
        this.HAS_LOGGED_IN = json && json.result == "success" ? "true" : "false";
        if (this.HAS_LOGGED_IN == "true") {
            this.events.publish('user:logout');
            this.storage.remove(this.HAS_LOGGED_IN);
        }
    });
  }

  // return a promise
  hasLoggedIn() {

    let query_login_url = CONSTANT.SERVICE_API_URL + "queryLogin.do";
    // don't have the data yet
    return new Promise(resolve => {
        // We're using Angular Http provider to request the data,
        // then on the response it'll map the JSON data to a parsed JS object.
        // Next we process the data and resolve the promise with the new data.
        this.http.get(query_login_url).subscribe(res => {
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            let json = res.json();
            this.HAS_LOGGED_IN = json && json.result == "success"?"true":"false";
            if(this.HAS_LOGGED_IN == "true"){
                this.login();
            }
            resolve(this.HAS_LOGGED_IN);
        });
    });
  }

  private encode(json) {

      var tmps = [];
      for (var key in json) {
          tmps.push(key + '=' + json[key]);
      }

      return tmps.join('&');
  }

}
