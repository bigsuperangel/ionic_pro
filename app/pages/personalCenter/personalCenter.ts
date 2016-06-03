import { Page } from 'ionic-angular';
import {Storage, LocalStorage} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {User} from '../../models/user';

@Page({
    templateUrl: 'build/pages/personalCenter/personalCenter.html'
})

export class PersonalCenterPage{
    storage: Storage;
    user : User;
    constructor(private nav: NavController) {
      this.storage = new Storage(LocalStorage);
      this.storage.get('user_cache').then((value)=>{
          this.user = JSON.parse(value);
      });
    }
}
